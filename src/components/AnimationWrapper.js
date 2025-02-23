import { useInView } from "react-intersection-observer";

function AnimationWrapper({ children, ...props }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // İlk görünümde animasyon başlar
    threshold: 0.1, // Ekranda %10 görünür olduğunda animasyon başlar
  });

  return (
    <div ref={ref} className={inView ? "animate-visible" : "animate-hidden"}>
      {children}
    </div>
  );
}

export default AnimationWrapper;
