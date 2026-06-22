export interface Testimonial {
  id: string;
  name: string;
  flag: string;
  path: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Brandi",
    flag: "🇺🇸",
    path: "Cloud Engineering",
    quote:
      "NextWork helped me land my first cloud job in just 3 months. The hands-on projects were exactly what interviewers wanted to see.",
    avatar: "B",
  },
  {
    id: "2",
    name: "Zachary",
    flag: "🇨🇦",
    path: "DevOps",
    quote:
      "I went from zero AWS knowledge to getting AWS certified in 8 weeks. The structured project path made all the difference.",
    avatar: "Z",
  },
  {
    id: "3",
    name: "Arina",
    flag: "🇷🇺",
    path: "AI & ML",
    quote:
      "The AI projects on NextWork are practical and industry-relevant. I built a portfolio that got me noticed by top tech companies.",
    avatar: "A",
  },
  {
    id: "4",
    name: "Denzel",
    flag: "🇿🇦",
    path: "Backend Engineering",
    quote:
      "Learning by building real projects is the only way. NextWork's community kept me accountable and motivated throughout.",
    avatar: "D",
  },
  {
    id: "5",
    name: "Mujtabaa",
    flag: "🇵🇰",
    path: "Cloud & DevOps",
    quote:
      "I completed 12 projects in 2 months and my portfolio impressed every recruiter. NextWork changed my career trajectory.",
    avatar: "M",
  },
  {
    id: "6",
    name: "Elena",
    flag: "🇪🇸",
    path: "Frontend Dev",
    quote:
      "Finally a platform that focuses on doing, not watching videos. I have real projects to show for my learning.",
    avatar: "E",
  },
];
