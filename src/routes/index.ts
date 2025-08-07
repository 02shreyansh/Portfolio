import { lazy, type LazyExoticComponent, type FC } from "react";


const Home:         LazyExoticComponent<FC> = lazy(() => import("@/pages/Home"));
const About:        LazyExoticComponent<FC> = lazy(() => import("@/pages/About/About"));
const Projects:     LazyExoticComponent<FC> = lazy(() => import("@/pages/Projects"));
const Experience:   LazyExoticComponent<FC> = lazy(() => import("@/pages/Experience"));
const DataStories:  LazyExoticComponent<FC> = lazy(() => import("@/pages/DataStories"));
const Blog:         LazyExoticComponent<FC> = lazy(() => import("@/pages/Blog"));
const BlogPost:     LazyExoticComponent<FC> = lazy(() => import("@/pages/BlogPost"));
const Playground:   LazyExoticComponent<FC> = lazy(() => import("@/pages/Playground"));
const Contact:      LazyExoticComponent<FC> = lazy(() => import("@/pages/Contact"));
const Now:          LazyExoticComponent<FC> = lazy(() => import("@/pages/Now"));
const Achievements: LazyExoticComponent<FC> = lazy(() => import("@/pages/Achievements"));
const Resume:       LazyExoticComponent<FC> = lazy(() => import("@/pages/Resume"));
const NotFound:     LazyExoticComponent<FC> = lazy(() => import("@/pages/NotFound"));

export interface RouteConfig {
  path: string;
  element: LazyExoticComponent<FC>;
  title: string;
}

const routes: RouteConfig[] = [
  { path: "/",                 element: Home,         title: "Home" },
  { path: "/about",            element: About,        title: "About" },
  { path: "/projects",         element: Projects,     title: "Projects" },
  { path: "/experience",       element: Experience,   title: "Experience" },
  { path: "/datastories",      element: DataStories,  title: "Data Stories" },
  { path: "/blog",             element: Blog,         title: "Blog" },
  { path: "/blog/:slug",       element: BlogPost,     title: "Blog Post" },
  { path: "/playground",       element: Playground,   title: "Playground" },
  { path: "/contact",          element: Contact,      title: "Contact" },
  { path: "/now",              element: Now,          title: "Now" },
  { path: "/achievements",     element: Achievements, title: "Achievements" },
  { path: "/resume",           element: Resume,       title: "Resume" },
  { path: "/404",              element: NotFound,     title: "Not Found" },
];

export default routes;