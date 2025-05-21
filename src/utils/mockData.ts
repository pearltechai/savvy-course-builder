
import { CourseStructure } from '@/components/CourseOutline';

export const generateMockCourse = (topic: string): CourseStructure => {
  // Generate a unique ID for the course
  const courseId = `course-${Date.now()}`;
  
  let subtopics = [];
  let courseDescription = '';
  
  // Different course structures based on the topic
  if (topic.toLowerCase().includes('machine learning')) {
    courseDescription = 'A comprehensive overview of machine learning concepts, techniques, and applications.';
    subtopics = [
      {
        id: `subtopic-${Date.now()}-1`,
        title: 'Introduction to Machine Learning',
        description: 'Basic concepts and applications of machine learning',
        content: 'Machine Learning is a subfield of artificial intelligence that enables computers to learn from data without being explicitly programmed. It focuses on developing algorithms that can receive input data and use statistical analysis to predict an output while updating outputs as new data becomes available.\n\nThe field of machine learning emerged from the study of pattern recognition and computational learning theory in artificial intelligence. In 1959, Arthur Samuel defined machine learning as a "Field of study that gives computers the ability to learn without being explicitly programmed." This definition still holds true today.\n\nMachine learning has become increasingly important in recent years due to the exponential growth of data and computational power. It powers many services we use daily, including recommendation systems (like those used by Netflix and Amazon), search engines (Google), social media feeds (Facebook), voice assistants (Siri, Alexa), and email filters.'
      },
      {
        id: `subtopic-${Date.now()}-2`,
        title: 'Supervised Learning',
        description: 'Learning with labeled data and prediction models',
        content: 'Supervised learning is a machine learning approach where the algorithm learns from labeled training data. The model makes predictions based on evidence in the presence of uncertainty.\n\nIn supervised learning, each example is a pair consisting of an input object (typically a vector) and the desired output value (also called the supervisory signal). A supervised learning algorithm analyzes the training data and produces an inferred function, which can be used for mapping new examples.\n\nCommon supervised learning tasks include:\n\n1. Classification: Predicting a discrete class label output for an input. Examples include spam detection, image recognition, and disease diagnosis.\n\n2. Regression: Predicting a continuous value output for an input. Examples include house price prediction, stock price forecasting, and age estimation from images.\n\nPopular supervised learning algorithms include Linear Regression, Logistic Regression, Decision Trees, Random Forests, Support Vector Machines (SVM), and Neural Networks.'
      },
      {
        id: `subtopic-${Date.now()}-3`,
        title: 'Unsupervised Learning',
        description: 'Finding patterns and structures in unlabeled data',
        content: 'Unsupervised learning is a type of machine learning where models are trained using data that is neither classified nor labeled. The system tries to learn without a teacher, identifying patterns and structures from the input data.\n\nUnlike supervised learning, there are no explicit right answers and there is no teacher. The algorithm must discover the interesting patterns in the data on its own.\n\nKey tasks in unsupervised learning include:\n\n1. Clustering: Grouping data points into clusters based on similarity. Examples include customer segmentation, document clustering, and image segmentation.\n\n2. Dimensionality Reduction: Reducing the number of variables under consideration by obtaining a set of principal variables. Examples include Principal Component Analysis (PCA) and t-SNE.\n\n3. Association Rule Learning: Discovering relationships between variables in large databases. A common example is market basket analysis, which identifies items frequently bought together.\n\nPopular unsupervised learning algorithms include k-means clustering, hierarchical clustering, DBSCAN, PCA, and autoencoders.'
      },
      {
        id: `subtopic-${Date.now()}-4`,
        title: 'Neural Networks and Deep Learning',
        description: 'Advanced models inspired by the human brain',
        content: 'Neural networks are computing systems inspired by the biological neural networks that constitute animal brains. Deep learning is a subset of machine learning that uses multi-layered neural networks to analyze various forms of data.\n\nA neural network consists of layers of interconnected nodes or "neurons." Each connection can transmit a signal to other neurons. The receiving neuron processes the signal and signals downstream neurons connected to it. Typically, neurons are organized in layers, with different layers performing different transformations on their inputs.\n\nDeep learning has revolutionized many fields, particularly:\n\n1. Computer Vision: Image classification, object detection, and facial recognition.\n\n2. Natural Language Processing: Machine translation, sentiment analysis, and language generation.\n\n3. Speech Recognition: Converting spoken language into text.\n\n4. Reinforcement Learning: Training agents to make decisions in complex, dynamic environments.\n\nPopular deep learning architectures include Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs), Long Short-Term Memory Networks (LSTMs), and Transformers. The field has seen remarkable advances with models like GPT (Generative Pre-trained Transformer) and BERT (Bidirectional Encoder Representations from Transformers) pushing the boundaries of what AI can achieve.'
      },
      {
        id: `subtopic-${Date.now()}-5`,
        title: 'Evaluation and Model Selection',
        description: 'Techniques to assess and improve model performance',
        content: 'Evaluation and model selection are crucial steps in the machine learning pipeline. They help us understand how well our models are performing and guide us in choosing the best model for our specific problem.\n\nCommon evaluation metrics include:\n\n1. For Classification Problems:\n   - Accuracy: The proportion of correct predictions among the total predictions.\n   - Precision: The proportion of true positive predictions among all positive predictions.\n   - Recall: The proportion of true positive predictions among all actual positives.\n   - F1-Score: The harmonic mean of precision and recall.\n   - ROC Curve and AUC: Graphical representation of the trade-off between true positive rate and false positive rate.\n\n2. For Regression Problems:\n   - Mean Absolute Error (MAE): The average absolute difference between predicted and actual values.\n   - Mean Squared Error (MSE): The average of the squared differences between predicted and actual values.\n   - Root Mean Squared Error (RMSE): The square root of MSE.\n   - R-squared: The proportion of variance in the dependent variable that can be explained by the independent variables.\n\nModel selection techniques include:\n\n1. Cross-Validation: Dividing the data into multiple folds, training on some folds, and testing on the remaining fold.\n\n2. Hyperparameter Tuning: Systematically searching for the optimal hyperparameters using techniques like grid search, random search, or Bayesian optimization.\n\n3. Regularization: Adding a penalty term to the loss function to prevent overfitting.\n\n4. Ensemble Methods: Combining multiple models to improve performance and robustness.\n\nThe ultimate goal is to select a model that generalizes well to unseen data, avoiding both underfitting (high bias) and overfitting (high variance).'
      }
    ];
  } 
  else if (topic.toLowerCase().includes('rome') || topic.toLowerCase().includes('roman')) {
    courseDescription = 'Explore the rise and fall of the Roman Empire and its lasting influence on Western civilization.';
    subtopics = [
      {
        id: `subtopic-${Date.now()}-1`,
        title: 'The Founding of Rome',
        description: 'Myths and historical facts about Rome\'s origins',
        content: 'According to Roman mythology, Rome was founded on April 21, 753 BCE by twin brothers Romulus and Remus on the banks of the Tiber River. The legend states that Romulus and Remus were the sons of Mars, the god of war, and were raised by a she-wolf after being abandoned. Eventually, they decided to build a city, but quarreled over its location. Romulus killed Remus in the dispute and then named the city after himself.\n\nArchaeological evidence suggests that Rome was actually founded as a settlement around the 8th century BCE, which aligns with the legendary date. The earliest settlements were on the Palatine Hill, one of the seven hills of Rome. The area was attractive for settlement due to its strategic location along the Tiber River, which provided both trade opportunities and natural protection.\n\nThe early Romans were part of the Latin culture, one of many Italic peoples living in the Italian Peninsula at the time. They coexisted and interacted with the Etruscans to the north and the Greek colonies to the south, both of which heavily influenced early Roman culture and governance.\n\nHistorical records indicate that Rome was initially ruled by kings, beginning with Romulus and followed by six subsequent kings. This period, known as the Roman Kingdom, lasted until 509 BCE when the last king, Tarquinius Superbus, was overthrown, leading to the establishment of the Roman Republic.'
      },
      {
        id: `subtopic-${Date.now()}-2`,
        title: 'The Roman Republic',
        description: 'The political system, expansion, and social conflicts',
        content: 'The Roman Republic was established around 509 BCE after the overthrow of the last Roman king, Tarquinius Superbus. The new political system was designed to prevent the concentration of power by dividing authority among different institutions.\n\nThe government structure included:\n\n1. The Senate: Originally composed of patrician (aristocratic) elders who advised the kings. Under the Republic, the Senate became the most powerful political body, controlling foreign policy, financial affairs, and guiding the overall policy of Rome.\n\n2. Magistrates: Elected officials who executed the day-to-day governance. The highest position was that of consul, with two consuls elected annually who held executive power and command of the army. Other magistrates included praetors (judges), quaestors (financial administrators), and aediles (public works administrators).\n\n3. The Assemblies: Various citizen assemblies that elected magistrates and passed laws.\n\nThe early Republic faced both internal and external challenges. Internally, there was a significant social conflict between the patricians (aristocratic families) and plebeians (common citizens). The Conflict of the Orders was a drawn-out struggle where plebeians fought for political equality. Over time, plebeians gained important rights, including the creation of the office of Tribune of the Plebs, who could veto senatorial decisions, and the codification of laws in the Twelve Tables around 450 BCE.\n\nExternally, Rome gradually expanded its territory, first within Latium, then throughout the Italian Peninsula. Key conflicts included the Samnite Wars (343-290 BCE) and the Pyrrhic War (280-275 BCE) against the Greek king Pyrrhus. By 265 BCE, Rome had conquered most of the Italian Peninsula.'
      },
      {
        id: `subtopic-${Date.now()}-3`,
        title: 'Punic Wars and Mediterranean Expansion',
        description: 'Rome\'s conflicts with Carthage and expansion into a Mediterranean power',
        content: 'The Punic Wars were a series of three wars fought between Rome and Carthage from 264 BCE to 146 BCE that transformed Rome from an Italian power to a Mediterranean empire.\n\nThe First Punic War (264-241 BCE) began over control of Sicily. Rome, despite lacking naval experience, built a fleet and eventually defeated the Carthaginian navy. The war ended with Carthage ceding Sicily to Rome and paying a large indemnity.\n\nThe Second Punic War (218-201 BCE) is famous for Hannibal\'s crossing of the Alps with elephants to invade Italy. After initial devastating defeats, including at the Battle of Cannae (216 BCE), Rome adopted a strategy of avoiding direct confrontation while attacking Carthaginian holdings elsewhere. Eventually, Scipio Africanus invaded North Africa, forcing Hannibal to return to defend Carthage. Scipio defeated Hannibal at the Battle of Zama (202 BCE), ending the war with harsh terms for Carthage.\n\nThe Third Punic War (149-146 BCE) resulted in the complete destruction of Carthage. Rome, led by Cato the Elder who famously ended all his speeches with "Carthago delenda est" ("Carthage must be destroyed"), besieged and razed the city, selling its surviving inhabitants into slavery and turning its territory into the province of Africa.\n\nConcurrently with the Punic Wars, Rome expanded eastward into the Hellenistic world. The Macedonian Wars against Philip V and later Perseus resulted in Roman control over Greece by 168 BCE. The Kingdom of Pergamon was bequeathed to Rome in 133 BCE, becoming the province of Asia.\n\nBy the mid-2nd century BCE, Rome had become the dominant power in the Mediterranean, controlling most of North Africa, Greece, and parts of Asia Minor, fundamentally altering the Mediterranean political landscape.'
      },
      {
        id: `subtopic-${Date.now()}-4`,
        title: 'The Fall of the Republic',
        description: 'Civil wars, reforms, and the rise of powerful generals',
        content: 'The expansion of Rome across the Mediterranean brought enormous wealth and power, but also destabilized the traditional Republican system, ultimately leading to its fall.\n\nSocial problems grew as wealth became increasingly concentrated in the hands of a few, while many citizens lost their lands. The brothers Tiberius and Gaius Gracchus attempted reforms in the late 2nd century BCE to redistribute land and extend citizenship, but both were killed by conservative senators, marking the beginning of violent political conflict.\n\nMilitary reforms by Gaius Marius around 107 BCE professionalized the army by allowing non-property owners to join, but had the unintended consequence of making soldiers loyal to their generals rather than to the Republic. This shift created the conditions for powerful generals to gain personal political power.\n\nThe first major civil war erupted between Marius and Sulla in the 80s BCE, with Sulla eventually marching on Rome and establishing himself as dictator. Though Sulla eventually stepped down, his actions set a dangerous precedent.\n\nThe First Triumvirate—an informal alliance between Pompey, Crassus, and Julius Caesar—dominated Roman politics from 60 BCE. After Crassus's death and growing tensions, civil war broke out between Caesar and Pompey. Caesar emerged victorious and was named dictator perpetuo (dictator for life) in 44 BCE, but was assassinated on the Ides of March (March 15) by senators who feared he wanted to be king.\n\nCaesar\'s death triggered another civil war, with his adopted son Octavian (later Augustus) eventually defeating Mark Antony and Cleopatra at the Battle of Actium in 31 BCE. By 27 BCE, Octavian had consolidated power and was granted the title of Augustus by the Senate, effectively ending the Republic and beginning the Roman Empire, though he carefully maintained the facade of republican institutions.'
      },
      {
        id: `subtopic-${Date.now()}-5`,
        title: 'The Roman Empire',
        description: 'Augustus, the Pax Romana, and imperial institutions',
        content: 'The Roman Empire began with Augustus (formerly Octavian), who ruled from 27 BCE to 14 CE. He created a new political system, the Principate, which maintained the appearance of the Republic while concentrating actual power in the hands of the "princeps" or first citizen – himself. Augustus implemented wide-ranging reforms, rebuilding Rome\'s infrastructure, establishing a standing army, creating a fire brigade and police force, and promoting moral and religious revival.\n\nHis reign began the Pax Romana (Roman Peace), a roughly 200-year period of stability and prosperity. During this time, the Empire expanded to its greatest extent under Emperor Trajan (r. 98-117 CE), encompassing most of Europe, North Africa, and parts of the Middle East.\n\nThe imperial government was sophisticated, with an extensive bureaucracy administering the provinces. The Empire was connected by an impressive network of roads spanning over 250,000 miles, facilitating trade, communication, and military movement. Cities throughout the Empire featured similar amenities: forums, basilicas, theaters, amphitheaters, temples, and baths.\n\nRoman culture spread throughout the Empire, including the Latin language, Roman law, architecture, and engineering practices. In turn, Rome was influenced by conquered peoples, particularly the Greeks, whose philosophy, literature, and art were highly respected.\n\nThe Empire began facing growing challenges in the 3rd century CE. The Crisis of the Third Century (235-284 CE) saw rapid turnover of emperors, economic troubles, civil wars, and increased pressure from barbarian tribes. Emperor Diocletian (r. 284-305 CE) attempted to address these issues by dividing the Empire into Western and Eastern administrative halves and instituting economic reforms.\n\nConstantine the Great (r. 306-337 CE) reunited the Empire temporarily and made Christianity legal through the Edict of Milan in 313 CE. He also established Constantinople as a new capital in the East, which would later become the center of the Byzantine Empire.'
      }
    ];
  } 
  else {
    // Generic course structure for any other topic
    courseDescription = `A comprehensive exploration of ${topic} covering fundamental concepts and practical applications.`;
    subtopics = [
      {
        id: `subtopic-${Date.now()}-1`,
        title: `Introduction to ${topic}`,
        description: `Basic concepts and foundations of ${topic}`,
        content: `${topic} is a fascinating subject with a rich history and wide-ranging applications in our modern world. This introductory lesson covers the fundamental concepts, historical development, and key terminology that forms the basis for understanding this field.\n\nThe study of ${topic} can be traced back through various historical periods, with significant advancements occurring alongside human civilization's progress. Early pioneers laid the groundwork for what would eventually become a formalized discipline.\n\nToday, ${topic} intersects with numerous other fields and continues to evolve with technological and societal changes. Understanding the basic principles will provide a strong foundation for deeper exploration of more specialized areas within this subject.`
      },
      {
        id: `subtopic-${Date.now()}-2`,
        title: `Key Principles of ${topic}`,
        description: `Core theories and frameworks in ${topic}`,
        content: `This lesson explores the underlying principles and theories that form the backbone of ${topic}. These principles provide the conceptual framework that experts use to understand, analyze, and develop applications in this field.\n\nSeveral key frameworks have emerged over time, each offering unique perspectives on how to approach problems and interpret phenomena related to ${topic}. These frameworks often complement each other, providing a comprehensive understanding when used together.\n\nCritical thinking and analytical skills are essential when applying these principles to real-world situations. By mastering these foundational concepts, you'll be equipped to tackle more complex topics and develop innovative approaches to challenges in this field.`
      },
      {
        id: `subtopic-${Date.now()}-3`,
        title: `Applications of ${topic}`,
        description: `Practical uses and implementations`,
        content: `${topic} has numerous practical applications across various domains including business, science, healthcare, and everyday life. This lesson explores how theoretical knowledge translates into practical solutions.\n\nIn professional settings, ${topic} is used to optimize processes, solve complex problems, and drive innovation. Organizations of all sizes rely on principles from this field to maintain competitive advantages and improve outcomes.\n\nOn a personal level, understanding ${topic} can help individuals make better decisions, develop new skills, and gain insights into everyday phenomena. The versatility of this knowledge makes it valuable across virtually all aspects of modern life.\n\nCase studies demonstrate successful implementations and provide valuable lessons about both the potential and limitations of applying ${topic} in different contexts.`
      },
      {
        id: `subtopic-${Date.now()}-4`,
        title: `Advanced Topics in ${topic}`,
        description: `Cutting-edge research and specialized areas`,
        content: `This lesson delves into the cutting-edge developments and specialized areas within ${topic}. As the field has matured, various sub-disciplines have emerged, each with distinct methodologies and focus areas.\n\nCurrent research is pushing the boundaries of what's possible, with innovations addressing longstanding challenges and opening new avenues for exploration. Interdisciplinary approaches are increasingly common, combining insights from multiple fields to tackle complex problems.\n\nEmerging technologies have significantly impacted how ${topic} is researched and applied. Digital tools, advanced analytics, and new methodological approaches have accelerated progress and enabled previously impossible investigations.\n\nThese advanced topics represent the frontier of knowledge in ${topic} and hint at future directions the field may take as research continues to evolve and new applications are discovered.`
      }
    ];
  }

  return {
    id: courseId,
    title: `${topic}`,
    description: courseDescription,
    subtopics: subtopics
  };
};

export const suggestedQuestionsBySubtopic = {
  "Machine Learning": [
    "What are the main types of machine learning?",
    "How does supervised learning differ from unsupervised learning?",
    "What skills do I need to start a career in machine learning?",
    "What are some ethical concerns with machine learning?"
  ],
  "Supervised Learning": [
    "What are some common supervised learning algorithms?",
    "What is the difference between classification and regression?",
    "How do you handle overfitting in supervised learning models?",
    "What metrics are used to evaluate supervised learning models?"
  ],
  "Neural Networks": [
    "How are neural networks inspired by the human brain?",
    "What's the difference between shallow and deep neural networks?",
    "What is backpropagation and why is it important?",
    "What hardware is typically used for training neural networks?"
  ],
  "Ancient Rome": [
    "Who were the most influential Roman emperors?",
    "How did Roman engineering influence modern architecture?",
    "What caused the fall of the Roman Empire?",
    "How did Roman law influence modern legal systems?"
  ],
  "default": [
    "What are the key principles of this topic?",
    "How can I apply this knowledge practically?",
    "What are common misconceptions about this subject?",
    "How has this field evolved over time?"
  ]
};

export const getSuggestedQuestions = (subtopicTitle: string): string[] => {
  // Check if we have specific questions for this subtopic
  const key = Object.keys(suggestedQuestionsBySubtopic).find(
    k => subtopicTitle.toLowerCase().includes(k.toLowerCase())
  );
  
  return key 
    ? suggestedQuestionsBySubtopic[key as keyof typeof suggestedQuestionsBySubtopic] 
    : suggestedQuestionsBySubtopic.default;
};
