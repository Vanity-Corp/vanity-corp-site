"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Suspense,
  Component,
  ReactNode,
} from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Camera,
  Compass,
  Theater,
  Lightbulb,
  Clapperboard,
  BarChart,
  Target,
  Users,
  Video,
  ImageIcon,
  Film,
  LucideIcon,
} from "lucide-react";
import { Group } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import clsx from "clsx";
// 3D models are now code-split + client-only. They touch WebGL/window,
// so ssr:false is mandatory here (this would otherwise crash on the server).
const ModelCamera = dynamic(() => import("./models/Camera2"), { ssr: false });
const ModelGreenScreen = dynamic(() => import("./models/GreenScreend"), {
  ssr: false,
});
const ModelStoryBoard = dynamic(() => import("./models/StoryBoard"), {
  ssr: false,
});

// Types -----------------------------------------------------------------
export interface ServiceFeature {
  name: string;
  description: string;
  /** Lucide icon name (mapped below). */
  icon: string;
}

// Maps the icon names stored in the CMS / lib/services to Lucide components.
const FEATURE_ICONS: Record<string, LucideIcon> = {
  Camera,
  Lightbulb,
  Clapperboard,
  BarChart,
  Target,
  Users,
  Video,
  ImageIcon,
  Film,
};

export interface Service {
  eyebrow: string;
  title: string;
  color: string;
  link: string;
  id: string;
  description: string;
  image?: string;
  reverse?: boolean;
  features: ServiceFeature[];
}

interface ServicesMosaicProps {
  services: Service[];
}

interface CardProps {
  service: Service;
  index: number;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError?: () => void;
}

// Mapping icônes principales (pour l'en-tête)
const iconMap: Record<string, LucideIcon> = {
  "studio-de-tournage": Theater,
  "accompagnement-strategique": Compass,
  audiovisuel: Camera,
};

// Mapping modèles 3D par ID de service
const modelMap = {
  "studio-de-tournage": ModelGreenScreen,
  "accompagnement-strategique": ModelStoryBoard,
  audiovisuel: ModelCamera,
};

// Hooks -------------------------------------------------------------------

// Detects small/touch viewports so we can skip WebGL entirely on mobile.
function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

// Cheap capability check — some browsers/embeds/older devices disable WebGL,
// or it can be lost (driver crash, too many contexts open at once, etc.)
function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}

// Lazy-mount-on-scroll: don't even attempt the 3D bundle/asset fetch until
// the card is actually visible. Also lets us pause the render loop later
// when the card scrolls back out of view.
function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options,
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

// Sits inside the Canvas/Suspense tree and fires once the scene has actually
// produced a frame — our signal that the model "rendered properly".
function ModelReadyProbe({ onReady }: { onReady: () => void }) {
  const firedRef = useRef(false);
  useFrame(() => {
    if (!firedRef.current) {
      firedRef.current = true;
      onReady();
    }
  });
  return null;
}

// Error Boundary --------------------------------------------------------
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Composant ThreeScene générique avec modèle en prop
interface ThreeSceneProps {
  groupRef: React.RefObject<Group>;
  ModelComponent: React.ComponentType<any>;
  onReady: () => void;
  active: boolean; // pause render loop when the card is off-screen
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
  groupRef,
  ModelComponent,
  onReady,
  active,
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 1.5]} // cap pixel ratio — retina/4K screens don't need more, big GPU win
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"} // stop rendering when scrolled out of view
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="apartment" />
      <Suspense fallback={null}>
        <group ref={groupRef} scale={0.9} position={[0, -3, 0]}>
          <ModelComponent />
        </group>
        <ModelReadyProbe onReady={onReady} />
      </Suspense>
    </Canvas>
  );
};

// Carte individuelle ----------------------------------------------------
type ModelStatus = "pending" | "ready" | "failed";

const Card: React.FC<CardProps> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const modelGroupRef = useRef<Group>(null);
  const rotationAnim = useRef<gsap.core.Tween | null>(null);
  const [hovered, setHovered] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelStatus>("pending");
  const disabledIds = ["accompagnement-strategique", "audiovisuel"];
  const isDisabled = disabledIds.includes(service.id);
  const isMobile = useIsMobile();
  const webglSupported = useWebGLSupport();
  const { ref: viewportRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.15,
  });

  // Sticky: once it's been seen, keep it mounted (cheaper than tearing
  // the WebGL context down/up every time it crosses the viewport edge).
  const [hasBeenInView, setHasBeenInView] = useState(false);
  useEffect(() => {
    if (inView) setHasBeenInView(true);
  }, [inView]);

  // The three gates: mobile, WebGL support, and "hasn't already failed".
  const shouldAttempt3D =
    hasBeenInView && !isMobile && webglSupported && modelStatus !== "failed";
  const showModel = shouldAttempt3D && modelStatus === "ready";
  const showSpinner = shouldAttempt3D && modelStatus === "pending";
  const showImage = !shouldAttempt3D;

  const Icon = iconMap[service.id] || Camera;
  const ModelComponent =
    modelMap[service.id as keyof typeof modelMap] || ModelCamera;

  let modelImage;
  switch (service.id) {
    case "studio-de-tournage":
      modelImage = "green screend.png";
      break;
    case "accompagnement-strategique":
      modelImage = "story board.png";
      break;
    default:
      modelImage = "camera.png";
  }

  const handleReady = useCallback(() => setModelStatus("ready"), []);
  const handleError = useCallback(() => setModelStatus("failed"), []);

  // 3-second budget: if the model hasn't produced a real frame by then
  // (slow asset, dropped WebGL context, stuck loader…), bail to the image
  // instead of leaving a blank or half-loaded canvas on screen.
  useEffect(() => {
    if (!shouldAttempt3D || modelStatus === "ready") return;

    const timeout = setTimeout(() => {
      setModelStatus((prev) => (prev === "ready" ? prev : "failed"));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [shouldAttempt3D, modelStatus]);

  // Gestion du survol (only runs once the model is actually showing)
  useEffect(() => {
    if (isDisabled) return;
    if (!showModel) return;

    if (hovered) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        boxShadow: "0 25px 30px -12px rgba(0,0,0,0.6)",
        duration: 0.3,
        ease: "power2.out",
      });

      if (modelGroupRef.current) {
        if (rotationAnim.current) rotationAnim.current.kill();
        rotationAnim.current = gsap.to(modelGroupRef.current.rotation, {
          y: `+=${Math.PI * 2}`,
          duration: 3,
          repeat: -1,
          ease: "none",
        });
      }
    } else {
      gsap.to(cardRef.current, {
        scale: 1,
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.2)",
        duration: 0.3,
        ease: "power2.out",
      });

      if (rotationAnim.current) {
        rotationAnim.current.kill();
        rotationAnim.current = null;
      }
      if (modelGroupRef.current) {
        gsap.to(modelGroupRef.current.rotation, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  }, [hovered, showModel, isDisabled]);
  const colorStyles = {
    "--service-color": service.color,
    "--service-color-rgb": service.color, // For rgba if needed
  } as React.CSSProperties;

  // Using clsx for clean conditional classes
  const cardClassName = clsx(
    "relative flex flex-col justify-between overflow-hidden rounded-2xl bg-neutral-900 backdrop-blur-sm",
    "border border-gray-700/50 transition-all duration-300",
    "hover:border-[var(--service-color)] hover:shadow-[0_0_30px_var(--service-color)]/20",
    {
      "opacity-60 grayscale cursor-not-allowed": isDisabled,
    },
  );

  const badgeClassName = clsx(
    "inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider",
    "rounded-full bg-black/60 backdrop-blur-sm border",
    "border-[var(--service-color)] text-[var(--service-color)]",
  );

  const spinnerClassName = clsx(
    "h-10 w-10 rounded-full border-2 border-gray-700 animate-spin",
    "border-t-[var(--service-color)]",
  );

  const imageClassName = clsx(
    "object-contain pointer-events-none transition-opacity duration-500",
    {
      "opacity-100": showImage,
      "opacity-0": !showImage,
    },
  );

  const spinnerContainerClassName = clsx(
    "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500",
    {
      "opacity-100": showSpinner,
      "opacity-0": !showSpinner,
    },
  );

  const modelContainerClassName = clsx(
    "absolute inset-0 transition-opacity duration-500",
    {
      "opacity-100": showModel,
      "opacity-0": !showModel,
    },
  );
  return (
    <div
      ref={cardRef}
      className={clsx(cardClassName, "group")}
      style={colorStyles}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={viewportRef} className="relative w-full h-64 md:h-80">
        {/* Poster image */}
        <Image
          src={`/newicones/${modelImage}`}
          alt={service.title}
          fill
          className={imageClassName}
        />

        {/* Spinner */}
        {shouldAttempt3D && (
          <div className={spinnerContainerClassName}>
            <div className={spinnerClassName} />
          </div>
        )}

        {/* 3D canvas */}
        {shouldAttempt3D && (
          <div className={modelContainerClassName}>
            <ErrorBoundary fallback={null} onError={handleError}>
              <ThreeScene
                groupRef={modelGroupRef}
                ModelComponent={ModelComponent}
                onReady={handleReady}
                active={inView}
              />
            </ErrorBoundary>
          </div>
        )}
      </div>

      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={badgeClassName}>{service.eyebrow}</span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between h-fu">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-white">{service.title}</h3>
        </div>
        <p className="mt-2 text-gray-300 text-sm">{service.description}</p>

        {/* Features */}
        <ul className="mt-4 space-y-4 text-sm text-gray-400">
          {service.features.map((feature, idx) => {
            const FeatureIcon = FEATURE_ICONS[feature.icon] || Camera;
            return (
              <li key={idx} className="flex items-start gap-3">
                <FeatureIcon
                  size={30}
                  style={{ color: service.color }}
                  className="mt-0.5 flex-shrink-0"
                />
                <span>
                  <span className="font-medium text-white">{feature.name}</span>{" "}
                  {feature.description}
                </span>
              </li>
            );
          })}
        </ul>
        {isDisabled && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-white text-lg font-semibold px-4 py-2 border border-white/30 rounded-lg bg-black/40">
              En cours de création
            </span>
          </div>
        )}
        {isDisabled ? (
          <span className="mt-6 w-full text-sm uppercase rounded-full bg-gray-600 text-gray-400 cursor-not-allowed py-2 text-center block">
            En cours de création
          </span>
        ) : (
          <Link href={`/${service.link}`}>
            <Button
              className="mt-6 w-full text-sm uppercase rounded-full"
              variant="default"
            >
              Voir plus
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

// Composant principal ----------------------------------------------------
export default function ServiceSection({ services }: ServicesMosaicProps) {
  return (
    <section className="py-24 sm:py-32 max-w-[1920px] m-auto px-6 sm:px-10 lg:px-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Nos Services</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Découvrez notre offre complète en audiovisuel, accompagnement
          stratégique et studio de tournage.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
