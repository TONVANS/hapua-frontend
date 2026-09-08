# Motion (Next.js 16) Scroll Animation Guidelines

This document serves as a reference guide for AI Agents to create or update Next.js 16 projects with scroll animations, based on the latest API documentation from [motion.dev](https://motion.dev/docs/react).

## 1. Installation
The latest version of Motion has migrated the package name from `framer-motion` to `motion`. Use the following command to install:
```bash
npm install motion
```

## 2. Fundamental Rules for Next.js 16 (App Router)
- **Client Components**: Any component utilizing `<motion.div>` or React Hooks (e.g., `useScroll`) must be rendered on the client side. You **must** include `"use client";` at the very top of the file.
- **Import Path**: Always import the library from `motion/react`.

```javascript
// ✅ Correct import for the latest version
import { motion, useScroll, useTransform } from "motion/react";
```

## 3. Supported Scroll Animation Patterns

### 3.1 Scroll-triggered (Animate on Viewport Entry)
**Best for:** Fade-ins, reveal effects, and lazy-loading animations that trigger when the user scrolls to a specific element.
- Utilize the `whileInView` prop paired with `initial`.
- Control the timing and behavior using the `viewport` prop (e.g., `{ once: true }` ensures the animation runs only once).

**Code Example:**
```javascript
"use client";
import { motion } from "motion/react";

export default function FadeInSection({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }} // amount: 0.3 means trigger when 30% of the element is visible
    >
      {children}
    </motion.div>
  );
}
```

### 3.2 Scroll-linked (Animations tied to Scroll Progress)
**Best for:** Parallax effects, reading progress bars, or scaling elements based on scroll position.
- Use the `useScroll()` hook to extract `scrollYProgress` (returns a value between 0 and 1).
- Combine with `useTransform()` to map the 0-1 value to desired CSS properties (e.g., px, %, degrees).

**Code Example (Reading Progress Bar):**
```javascript
"use client";
import { motion, useScroll } from "motion/react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll(); // Tracks scroll progress of the entire page
  
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "left",
      }}
      className="fixed top-0 left-0 right-0 h-1.5 bg-blue-500 z-50"
    />
  );
}
```

**Code Example (Parallax Effect & Element Tracking):**
To track the scroll progress of a specific element when it enters the viewport, assign a `useRef` as the `target`.

```javascript
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ParallaxImage() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // Starts when top of element hits bottom of viewport, ends when bottom hits top
  });
  
  // Maps 0-1 progress to Y-axis movement from -20% to 20%
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="overflow-hidden relative h-[500px] w-full">
      <motion.img 
        src="/image.jpg" 
        alt="Parallax"
        style={{ y }} 
        className="w-full h-full object-cover scale-125" 
      />
    </div>
  );
}
```

## 4. Best Practices & Performance
1. **Hardware Acceleration**: Prioritize animating properties that do not trigger layout recalculations, such as `opacity` and `transform` (`x`, `y`, `scale`, `rotate`). Motion will utilize GPU acceleration, preventing frame drops and ensuring smooth animations.
2. **Third-Party UI Components**: If you are wrapping third-party components (e.g., shadcn/ui, Radix) with `motion()`, ensure the target component supports `forwardRef`. Motion relies on refs to measure and animate elements.
3. **Tracking Scroll Direction**: Use `useMotionValueEvent` with `scrollY` to detect whether the user is scrolling up or down. This is highly effective for building auto-hiding navigation bars.
