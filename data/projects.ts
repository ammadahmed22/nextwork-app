export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Project {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  duration: string;
  description: string;
  tags: string[];
  url: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Build a RAG Chatbot with AWS Bedrock",
    category: "AI",
    difficulty: "Intermediate",
    duration: "3 hours",
    description:
      "Build a retrieval-augmented generation chatbot using AWS Bedrock and Claude. Connect it to your own documents.",
    tags: ["AWS", "RAG", "Claude", "Python"],
    url: "https://learn.nextwork.org/projects/ai-bedrock-rag-chatbot-python",
  },
  {
    id: "2",
    title: "Deploy a Kubernetes Cluster on EKS",
    category: "DevOps",
    difficulty: "Advanced",
    duration: "4 hours",
    description:
      "Set up a production-ready Kubernetes cluster on Amazon EKS with auto-scaling and monitoring.",
    tags: ["Kubernetes", "EKS", "AWS", "Docker"],
    url: "https://learn.nextwork.org/projects/devops-kubernetes-cluster-eks",
  },
  {
    id: "3",
    title: "Build a Portfolio with React & Tailwind",
    category: "Frontend",
    difficulty: "Beginner",
    duration: "2 hours",
    description:
      "Create a beautiful developer portfolio using React and Tailwind CSS that impresses recruiters.",
    tags: ["React", "Tailwind", "JavaScript", "CSS"],
    url: "https://learn.nextwork.org/projects/web-react-tailwind-portfolio",
  },
  {
    id: "4",
    title: "REST API with FastAPI & PostgreSQL",
    category: "Backend",
    difficulty: "Intermediate",
    duration: "3 hours",
    description:
      "Build a production-grade REST API with JWT authentication and database integration.",
    tags: ["FastAPI", "Python", "PostgreSQL", "Docker"],
    url: "https://learn.nextwork.org/projects/backend-fastapi-postgresql-api",
  },
  {
    id: "5",
    title: "ML Pipeline with SageMaker",
    category: "AI",
    difficulty: "Advanced",
    duration: "5 hours",
    description:
      "Build an end-to-end machine learning pipeline using AWS SageMaker from data prep to deployment.",
    tags: ["SageMaker", "Python", "ML", "AWS"],
    url: "https://learn.nextwork.org/projects/ai-sagemaker-ml-pipeline",
  },
  {
    id: "6",
    title: "Data Dashboard with Apache Spark",
    category: "Data",
    difficulty: "Intermediate",
    duration: "4 hours",
    description:
      "Process and visualize large datasets using Apache Spark and build an interactive dashboard.",
    tags: ["Spark", "Python", "Data", "Analytics"],
    url: "https://learn.nextwork.org/projects/data-apache-spark-dashboard",
  },
  {
    id: "7",
    title: "Serverless Functions on AWS Lambda",
    category: "Cloud",
    difficulty: "Beginner",
    duration: "2 hours",
    description:
      "Build and deploy serverless functions with AWS Lambda and API Gateway in under 2 hours.",
    tags: ["Lambda", "AWS", "Serverless", "Python"],
    url: "https://learn.nextwork.org/projects/cloud-aws-lambda-serverless",
  },
  {
    id: "8",
    title: "CI/CD Pipeline with GitHub Actions",
    category: "DevOps",
    difficulty: "Intermediate",
    duration: "2 hours",
    description:
      "Automate testing and deployment with a complete CI/CD pipeline using GitHub Actions.",
    tags: ["GitHub Actions", "CI/CD", "Docker", "DevOps"],
    url: "https://learn.nextwork.org/projects/devops-github-actions-cicd",
  },
];
