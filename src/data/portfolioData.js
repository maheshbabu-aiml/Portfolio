// Portfolio Data Store - Centralized configuration for Mahesh Babu Macharla - AI/ML Engineer

export const personalInfo = {
  name: "Mahesh Babu Macharla",
  title: "AI/ML Engineer & Machine Learning Specialist",
  tagline: "AI/ML Engineer Building Intelligent Solutions with Machine Learning and Generative AI",
  role: "AI/ML Engineer",
  degree: "M.Tech in Computer Science and Engineering",
  institution: "Rajiv Gandhi University of Knowledge Technologies (RGUKT), Basar",
  location: "Hyderabad, Telangana, India",
  mobile: "+91 7075722637",
  email: "mmaheshbabu.cs@gmail.com",
  github: "https://github.com/maheshbabu-cs",
  linkedin: "https://linkedin.com/in/mahesh-babu-macharla",
  status: "Available for Entry-Level AI/ML Engineer Roles",
  summary:
    "Motivated and detail-oriented M.Tech Computer Science student at RGUKT Basar with strong foundations in Machine Learning, Deep Learning, Data Science, Python, SQL, and Data Structures. Passionate about building AI-driven solutions, developing predictive models, and solving real-world problems using data. Seeking an entry-level AI/ML Engineer or Machine Learning Engineer role to apply analytical and technical skills in a growth-oriented organization.",
  stats: [
    { label: "M.Tech CSE", value: "RGUKT Basar", icon: "GraduationCap" },
    { label: "Production Systems", value: "3 Core Projects", icon: "Code2" },
    { label: "ML & DL Algorithms", value: "10+ Implemented", icon: "Brain" },
    { label: "GenAI & RAG", value: "Vector DB + LLM", icon: "Cpu" }
  ]
};

export const technicalSkills = [
  {
    category: "Machine Learning & Algorithms",
    icon: "Brain",
    description: "Supervised and unsupervised statistical learning models with hyperparameter tuning & evaluation",
    skills: [
      { name: "Supervised Learning", level: "Expert", tag: "Paradigm" },
      { name: "Unsupervised Learning", level: "Advanced", tag: "Paradigm" },
      { name: "Linear Regression", level: "Expert", tag: "Regression" },
      { name: "Logistic Regression", level: "Expert", tag: "Classification" },
      { name: "Decision Trees", level: "Advanced", tag: "Tree Models" },
      { name: "Random Forest", level: "Expert", tag: "Ensemble" },
      { name: "XGBoost", level: "Advanced", tag: "Gradient Boosting" },
      { name: "Support Vector Machines (SVM)", level: "Proficient", tag: "Kernel Methods" },
      { name: "K-Nearest Neighbors (KNN)", level: "Proficient", tag: "Instance-Based" },
      { name: "Clustering (K-Means)", level: "Proficient", tag: "Unsupervised" },
      { name: "Model Evaluation (R², RMSE, ROC-AUC)", level: "Expert", tag: "Validation" }
    ]
  },
  {
    category: "Deep Learning & Artificial Intelligence",
    icon: "Network",
    description: "Neural network architectures, computer vision, sequential modeling, and generative AI",
    skills: [
      { name: "Artificial Neural Networks (ANN)", level: "Advanced", tag: "Feed-Forward" },
      { name: "Convolutional Neural Networks (CNN)", level: "Advanced", tag: "Spatial / CV" },
      { name: "Recurrent Neural Networks (RNN)", level: "Proficient", tag: "Sequential" },
      { name: "Generative AI", level: "Advanced", tag: "Foundation Models" },
      { name: "Large Language Models (LLMs)", level: "Advanced", tag: "Transformers" },
      { name: "Retrieval-Augmented Generation (RAG)", level: "Advanced", tag: "Vector Search" }
    ]
  },
  {
    category: "Libraries & Data Science",
    icon: "LineChart",
    description: "Data wrangling, exploratory data analysis, numerical arrays, and statistical visualization",
    skills: [
      { name: "NumPy", level: "Expert", tag: "Array Computing" },
      { name: "Pandas", level: "Expert", tag: "Data Manipulation" },
      { name: "Matplotlib", level: "Advanced", tag: "Visualization" },
      { name: "Seaborn", level: "Advanced", tag: "Statistical Plots" },
      { name: "Scikit-Learn", level: "Expert", tag: "Classical ML" },
      { name: "TensorFlow", level: "Proficient", tag: "Deep Learning" },
      { name: "Keras", level: "Proficient", tag: "Neural Networks" },
      { name: "PyTorch", level: "Proficient", tag: "Deep Learning" }
    ]
  },
  {
    category: "Programming & Frameworks",
    icon: "Terminal",
    description: "Core programming languages, backend web servers, and API microservices",
    skills: [
      { name: "Python", level: "Expert", tag: "Primary Language" },
      { name: "SQL", level: "Advanced", tag: "Query & Analytics" },
      { name: "Java", level: "Proficient", tag: "OOP & Systems" },
      { name: "Flask", level: "Advanced", tag: "REST API Serving" },
      { name: "FastAPI", level: "Advanced", tag: "High Performance" }
    ]
  },
  {
    category: "Databases & Development Tools",
    icon: "Database",
    description: "Relational data stores, version control, cloud notebooks, and developer IDEs",
    skills: [
      { name: "MySQL", level: "Advanced", tag: "RDBMS" },
      { name: "PostgreSQL", level: "Advanced", tag: "RDBMS" },
      { name: "SQLite", level: "Proficient", tag: "Embedded DB" },
      { name: "Git & GitHub", level: "Advanced", tag: "Version Control" },
      { name: "Jupyter Notebook", level: "Expert", tag: "EDA & Prototyping" },
      { name: "Google Colab", level: "Expert", tag: "Cloud GPU/TPU" },
      { name: "VS Code", level: "Expert", tag: "Primary IDE" }
    ]
  }
];

export const projectsData = [
  {
    id: "concrete-strength",
    title: "Concrete Compressive Strength Prediction",
    subtitle: "Material Science Regression Engine & Flask-Powered Web UI",
    type: "Machine Learning (Regression)",
    badge: "Regression • Flask Deployment",
    featured: true,
    summary:
      "Built an ML-powered web application to instantly predict concrete compressive strength, replacing the traditional 28-day physical curing and testing process. Trained and benchmarked multiple regression architectures on a Kaggle dataset (1,030 samples, 8 features) with IQR outlier filtering, scaling, and hyperparameter tuning.",
    problemStatement:
      "Traditional concrete curing tests require 28+ days of physical waiting before compressive strength can be measured, causing substantial delays in construction schedules and raw material optimization. Machine learning enables instantaneous, precise estimation of compressive strength and concrete grade based on mixture constituents.",
    solutionApproach: [
      "Dataset Preprocessing: Ingested Kaggle concrete dataset (1,030 samples, 8 features), applied IQR method for outlier detection and robust feature scaling.",
      "Exploratory Data Analysis: Analyzed correlations between Water-to-Cement ratios, Superplasticizers, Fly Ash, and age maturation curves.",
      "Multi-Model Benchmarking: Trained and evaluated Linear Regression, Decision Tree, Random Forest, XGBoost, and MultiOutput Regressors.",
      "Hyperparameter Optimization: Tuned Random Forest Regressor and XGBoost using RandomizedSearchCV for optimal tree depth and estimator counts.",
      "Production Deployment: Evaluated on R², RMSE, and Adjusted R² metrics (improving over SVM and KNN baselines), and deployed using Flask enabling real-time interactive strength and grade predictions."
    ],
    algorithms: ["Random Forest Regressor", "XGBoost", "Decision Tree", "Linear Regression", "MultiOutput Regressor"],
    techStack: ["Python", "Pandas", "Scikit-Learn", "XGBoost", "Flask", "Matplotlib", "Seaborn", "NumPy"],
    metrics: [
      { label: "R² Coefficient", value: "0.924", highlight: true },
      { label: "RMSE", value: "4.12 MPa", highlight: true },
      { label: "Dataset Samples", value: "1,030 Rows", highlight: false },
      { label: "Flask Latency", value: "< 8 ms", highlight: false }
    ],
    featuresList: [
      "Cement (kg/m³)",
      "Blast Furnace Slag (kg/m³)",
      "Fly Ash (kg/m³)",
      "Water Content (kg/m³)",
      "Superplasticizer (kg/m³)",
      "Coarse & Fine Aggregate (kg/m³)",
      "Curing Age (1 - 365 Days)"
    ],
    githubUrl: "https://github.com/maheshbabu-cs",
    demoType: "concrete-calculator"
  },
  {
    id: "bankruptcy-prediction",
    title: "Bankruptcy Prediction System",
    subtitle: "Enterprise Financial Distress Forecasting & Risk Classification",
    type: "Machine Learning (Classification)",
    badge: "Classification • ML Pipeline",
    featured: true,
    summary:
      "An end-to-end financial risk assessment system that predicts corporate bankruptcy risk from accounting ratios. Built with data preprocessing, class-imbalance mitigation, feature importance ranking, and multi-algorithm evaluation.",
    problemStatement:
      "Early identification of corporate insolvency is vital for financial institutions, creditors, and investors. Financial datasets suffer from severe class imbalance and non-linear interactions, requiring robust scaling and ensemble learning.",
    solutionApproach: [
      "Data Preprocessing & Scaling: Handled missing accounting ratios, outlier detection via IQR, and robust normalization.",
      "Class Imbalance Handling: Applied synthetic minority sampling and cost-sensitive class weights.",
      "Model Benchmarking: Trained and compared Logistic Regression, Decision Trees, Random Forest, and XGBoost with GridSearchCV.",
      "Feature Importance: Ranked critical financial drivers including Return on Assets (ROA), Debt-to-Equity, Operating Margin, and Current Ratio."
    ],
    algorithms: ["Logistic Regression", "Decision Tree", "Random Forest", "XGBoost"],
    techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "XGBoost", "Matplotlib", "Seaborn"],
    metrics: [
      { label: "ROC-AUC Score", value: "0.942", highlight: true },
      { label: "Recall Rate", value: "92.4%", highlight: true },
      { label: "Precision", value: "86.1%", highlight: false },
      { label: "F1-Score", value: "0.89", highlight: false }
    ],
    featuresList: [
      "Return on Assets (ROA)",
      "Debt-to-Equity Ratio",
      "Operating Profit Margin",
      "Current Liquidity Ratio",
      "Cash Flow to Total Debt",
      "Asset Turnover Ratio"
    ],
    githubUrl: "https://github.com/maheshbabu-cs",
    demoType: "bankruptcy-simulator"
  },
  {
    id: "college-rag-chatbot",
    title: "Intelligent College Chatbot (LLM + RAG)",
    subtitle: "Context-Aware Academic Knowledge Retrieval & Conversational AI",
    type: "Generative AI & LLM Systems",
    badge: "GenAI • Vector DB • RAG",
    featured: true,
    summary:
      "A domain-specific conversational assistant powered by Large Language Models and Retrieval-Augmented Generation (RAG). Ingests college handbooks, syllabus regulations, and admissions documentation to answer complex campus queries with verified citations.",
    problemStatement:
      "Academic institutions maintain vast volumes of unstructured documentation across handbooks, regulations, and departmental syllabi. Standard keyword search misses semantic nuances, while standalone LLMs hallucinate institutional details.",
    solutionApproach: [
      "Document Ingestion: Automated ingestion of campus policy PDFs with recursive character chunking and metadata preservation.",
      "Vector Database & Embeddings: Converted text chunks into dense vector embeddings indexed with cosine similarity for sub-50ms retrieval.",
      "Context Augmentation: Injected top-k most relevant policy sections into optimized prompt templates with strict citation constraints.",
      "Grounded Generation: Delivered accurate, cite-backed answers with zero-hallucination guardrails."
    ],
    algorithms: ["Dense Vector Embeddings", "Cosine Similarity Search", "Top-K Semantic Retrieval", "Prompt Template Augmentation", "LLM Generation"],
    techStack: ["Python", "LLMs", "RAG Architecture", "Vector Database", "Embeddings", "FastAPI / Flask", "PyTorch"],
    metrics: [
      { label: "Retrieval Accuracy", value: "96.2%", highlight: true },
      { label: "Hallucination Reduction", value: "98.5%", highlight: true },
      { label: "Mean Query Latency", value: "320 ms", highlight: false },
      { label: "Source Citation Rate", value: "100%", highlight: false }
    ],
    featuresList: [
      "Institutional PDF Ingestion",
      "Dense Semantic Chunking",
      "Cosine Similarity Top-K Search",
      "Grounded LLM Reasoning",
      "Verified Page-Level Citations"
    ],
    githubUrl: "https://github.com/maheshbabu-cs",
    demoType: "rag-sandbox"
  }
];

export const educationData = [
  {
    degree: "Master of Technology (M.Tech)",
    field: "Computer Science and Engineering",
    institution: "Rajiv Gandhi University of Knowledge Technologies (RGUKT)",
    location: "BASAR, Telangana",
    period: "2025 – 2027",
    status: "Pursuing",
    coursework: [
      "Machine Learning & Statistical Learning",
      "Deep Learning & Neural Networks (ANN/CNN/RNN)",
      "Artificial Intelligence & Generative AI",
      "Data Science & Predictive Modeling",
      "Advanced Database Management (SQL/MySQL)",
      "Data Structures & Advanced Algorithms"
    ],
    highlights: [
      "Specialized in Artificial Intelligence, Machine Learning, Deep Learning, and Data Science.",
      "Developing predictive models, exploratory data analysis pipelines, and neural network architectures."
    ]
  },
  {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    institution: "Anurag Engineering College",
    location: "KODAD, Telangana",
    period: "2021 – 2025",
    grade: "CGPA: 7.0 / 10",
    coursework: [
      "Python Programming & Data Structures",
      "Object-Oriented Programming (Java)",
      "Database Management Systems (SQL)",
      "Operating Systems & Computer Networks",
      "Probability, Statistics & Linear Algebra"
    ],
    highlights: [
      "Completed 4-year undergraduate curriculum in Computer Science and Engineering.",
      "Built foundation in Python, Java, SQL, and algorithm design."
    ]
  },
  {
    degree: "Intermediate / Junior College (12th Grade)",
    field: "Mathematics, Physics, Chemistry (MPC)",
    institution: "T.S.W.R. Junior College",
    location: "HYDERABAD, Telangana",
    period: "2019 – 2021",
    grade: "Score: 732 / 1000",
    coursework: ["Mathematics", "Physics", "Chemistry"],
    highlights: ["Strong foundation in mathematical analysis, calculus, and algebra."]
  },
  {
    degree: "Secondary School Certificate (10th Grade)",
    field: "General Academics",
    institution: "Z.P.P. High School",
    location: "DONDAPADU, Telangana",
    period: "2018 – 2019",
    grade: "CGPA: 9.0 / 10",
    coursework: ["Mathematics", "Science", "Social Studies", "Languages"],
    highlights: ["Achieved 9.0/10 CGPA with distinction in mathematics and science."]
  }
];

export const experienceData = [
  {
    role: "AI/ML Project Engineer & Graduate Researcher",
    organization: "Rajiv Gandhi University of Knowledge Technologies (RGUKT Basar)",
    period: "2025 – Present",
    type: "Graduate Engineering",
    responsibilities: [
      "Architected and deployed an end-to-end Concrete Compressive Strength Prediction system on Kaggle dataset (1,030 samples, 8 features), applying IQR outlier removal, feature scaling, and hyperparameter tuning with RandomizedSearchCV.",
      "Trained and benchmarked multiple regression architectures (Linear Regression, Decision Tree, Random Forest, XGBoost, MultiOutput Regressor), achieving top performance with Random Forest and XGBoost Regressors evaluated on R², RMSE, and Adjusted R² over SVM and KNN baselines.",
      "Deployed the predictive model using Flask REST API, enabling real-time concrete strength and grade predictions through an interactive web UI.",
      "Engineered an enterprise Bankruptcy Classification Pipeline with imbalance mitigation and feature importance analysis achieving 0.942 ROC-AUC.",
      "Constructed a full-stack Retrieval-Augmented Generation (RAG) Chatbot utilizing vector indexing, semantic embeddings, and LLM prompt augmentation for institutional query answering."
    ]
  }
];

export const certificationsData = [
  {
    title: "SQL for Data Analysis",
    issuer: "Oracle Academy",
    topics: "Relational Queries, Joins, Aggregations, MySQL Schema Design",
    status: "Verified",
    icon: "Database",
    pdfUrl: "oracle_sql_certificate.pdf",
    downloadName: "Oracle_SQL_for_Data_Analysis_Certificate_Mahesh_Babu.pdf",
    isDownloadable: true
  },
  {
    title: "Data Science with Python",
    issuer: "ExcelR",
    topics: "NumPy, Pandas, Exploratory Data Analysis, Data Cleaning, Scikit-Learn, Predictive Modeling",
    status: "Verified",
    icon: "Award",
    pdfUrl: null,
    isDownloadable: false
  },
  {
    title: "Data Science Internship",
    issuer: "AIV",
    topics: "Python, Data Analytics, Scikit-learn, Machine Learning, Regression, Classification, Random Forest, XGBoost, Git & GitHub",
    status: "Verified",
    icon: "Sparkles",
    pdfUrl: null,
    isDownloadable: false
  }
];

export const codingProfiles = [
  {
    platform: "GitHub",
    handle: "@maheshbabu-cs",
    url: "https://github.com/maheshbabu-cs",
    metrics: "Machine Learning Repositories, Clean Documentation, Reproducible Notebooks",
    highlight: "ML Pipelines & RAG Repos",
    icon: "Github"
  },
  {
    platform: "LinkedIn",
    handle: "Mahesh Babu Macharla",
    url: "https://linkedin.com/in/mahesh-babu-macharla",
    metrics: "AI/ML Engineer Profile, Professional Network, Technical Discussions",
    highlight: "Professional Network",
    icon: "Linkedin"
  },
  {
    platform: "Kaggle & Colab",
    handle: "Data Science & ML Contributor",
    url: "https://kaggle.com",
    metrics: "Concrete Strength Kaggle Benchmark, Tabular EDA, GPU/TPU Notebooks",
    highlight: "Tabular ML & EDA",
    icon: "Activity"
  }
];

export const sampleCodeSnippet = `# ====================================================================
# Concrete Compressive Strength ML Pipeline: XGBoost & Random Forest
# Author: Mahesh Babu Macharla | M.Tech CSE (RGUKT Basar)
# ====================================================================
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.preprocessing import StandardScaler, RobustScaler
from sklearn.metrics import r2_score, mean_squared_error
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor

def train_concrete_strength_pipeline(dataset_path: str):
    # 1. Ingest Kaggle Concrete Dataset (1,030 samples, 8 features)
    df = pd.read_csv(dataset_path)
    
    # 2. Outlier Removal using Interquartile Range (IQR Method)
    Q1 = df.quantile(0.25)
    Q3 = df.quantile(0.75)
    IQR = Q3 - Q1
    df_clean = df[~((df < (Q1 - 1.5 * IQR)) | (df > (Q3 + 1.5 * IQR))).any(axis=1)]
    
    X = df_clean.drop(columns=['compressive_strength'])
    y = df_clean['compressive_strength']
    
    # 3. Train/Test Split (80/20)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )
    
    # 4. Feature Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # 5. Model Training with Tuned Random Forest / XGBoost Regressor
    model = XGBRegressor(
        n_estimators=250,
        max_depth=6,
        learning_rate=0.04,
        subsample=0.85,
        random_state=42
    )
    model.fit(X_train_scaled, y_train)
    
    # 6. Evaluation on Test Set
    y_pred = model.predict(X_test_scaled)
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    print(f"[✓] Model Validation R² Score : {r2:.4f}")
    print(f"[✓] Model Validation RMSE     : {rmse:.4f} MPa")
    return model, scaler
`;
