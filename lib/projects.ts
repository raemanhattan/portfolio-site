export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "live" | "in-progress";
}

// Each project is its own repo with its own frontend/backend, reverse-proxied
// under its slug via the rewrites in next.config.ts. Adding a project here
// only changes the landing page; wiring the actual route lives in
// next.config.ts.
export const PROJECTS: Project[] = [
  {
    slug: "contract-value",
    name: "Contract Value Agent",
    tagline: "NFL contract value and performance analysis",
    description:
      "A point-in-time market model regresses cap-hit percentage on production, age, and position, exposed through an LLM agent with typed tools over real contract and stats data.",
    stack: ["Next.js", "FastAPI", "DuckDB", "statsmodels"],
    status: "live",
  },
  {
    slug: "box-office",
    name: "Opening Weekend Forecasting",
    tagline: "Box office forecasting from pre-release signals",
    description:
      "Forecasts a film's opening weekend using pre-release features pulled from TMDB and YouTube trailer engagement.",
    stack: ["Next.js", "FastAPI", "scikit-learn"],
    status: "in-progress",
  },
];
