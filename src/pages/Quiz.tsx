import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  type: 'single' | 'multiple';
}

interface QuizResult {
  method: string;
  description: string;
  effectiveness: number;
  pros: string[];
  cons: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your age range?",
    options: ["Under 18", "18-25", "26-35", "36-45", "Over 45"],
    type: 'single'
  },
  {
    id: 2,
    question: "Are you planning to have children in the future?",
    options: ["Yes, within 1 year", "Yes, within 2-5 years", "Maybe in the future", "No, never"],
    type: 'single'
  },
  {
    id: 3,
    question: "Do you have any health conditions? (Select all that apply)",
    options: ["High blood pressure", "Diabetes", "Blood clotting disorders", "Migraines", "None of the above"],
    type: 'multiple'
  },
  {
    id: 4,
    question: "How important is ease of use to you?",
    options: ["Very important", "Somewhat important", "Not very important"],
    type: 'single'
  },
  {
    id: 5,
    question: "Are you comfortable with hormone-based methods?",
    options: ["Yes, no concerns", "Yes, but prefer low hormone", "Prefer non-hormonal", "Not sure"],
    type: 'single'
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, option: string, isMultiple: boolean) => {
    if (isMultiple) {
      const currentAnswers = answers[questionId] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter(a => a !== option)
        : [...currentAnswers, option];
      setAnswers({ ...answers, [questionId]: newAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: [option] });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getRecommendation = (): QuizResult => {
    // Simple recommendation logic based on answers
    const ageAnswer = answers[1]?.[0];
    const planningChildren = answers[2]?.[0];
    const healthConditions = answers[3] || [];
    const hormoneComfort = answers[5]?.[0];

    if (hormoneComfort === "Prefer non-hormonal") {
      return {
        method: "Copper IUD",
        description: "A long-lasting, non-hormonal contraceptive that can provide protection for up to 10 years.",
        effectiveness: 99,
        pros: ["No hormones", "Long-lasting", "Highly effective", "Reversible"],
        cons: ["May increase menstrual flow", "Requires insertion procedure", "Initial cost"]
      };
    }

    if (planningChildren === "Yes, within 1 year") {
      return {
        method: "Barrier Methods",
        description: "Condoms and diaphragms provide protection that can be easily discontinued when ready to conceive.",
        effectiveness: 85,
        pros: ["Immediately reversible", "No hormones", "STI protection (condoms)", "Available over-the-counter"],
        cons: ["Must be used every time", "Lower effectiveness", "May interrupt spontaneity"]
      };
    }

    return {
      method: "Birth Control Pill",
      description: "A daily oral contraceptive that's highly effective when taken consistently.",
      effectiveness: 91,
      pros: ["Highly effective", "Regulates periods", "May improve acne", "Easily reversible"],
      cons: ["Daily commitment", "May cause side effects", "Requires prescription"]
    };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const currentAnswers = answers[currentQ?.id] || [];

  if (showResults) {
    const recommendation = getRecommendation();
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center bg-gradient-primary text-primary-foreground">
            <CardTitle className="text-2xl md:text-3xl">Your Personalized Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-primary mb-2">{recommendation.method}</h3>
              <p className="text-muted-foreground text-lg">{recommendation.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-lg mb-4 text-accent">Effectiveness</h4>
                <div className="flex items-center gap-3">
                  <Progress value={recommendation.effectiveness} className="flex-1" />
                  <span className="font-bold text-2xl text-primary">{recommendation.effectiveness}%</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4 text-accent">Pros</h4>
                <ul className="space-y-2">
                  {recommendation.pros.map((pro, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-4 text-warning">Important Considerations</h4>
              <ul className="space-y-2">
                {recommendation.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                    <span className="text-sm">{con}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                This recommendation is based on your quiz responses. Please consult with a healthcare provider for personalized medical advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-primary">
                  Book Consultation
                </Button>
                <Button variant="outline" size="lg" onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}>
                  Retake Quiz
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Contraceptive Method Quiz</h1>
          <span className="text-muted-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQ.options.map((option, index) => {
            const isSelected = currentAnswers.includes(option);
            return (
              <Button
                key={index}
                variant={isSelected ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-4 px-6"
                onClick={() => handleAnswer(currentQ.id, option, currentQ.type === 'multiple')}
              >
                <div className="flex items-center gap-3">
                  {currentQ.type === 'multiple' ? (
                    <div className={`w-4 h-4 border-2 rounded ${isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                      {isSelected && <CheckCircle className="w-4 h-4 text-primary-foreground" />}
                    </div>
                  ) : (
                    <div className={`w-4 h-4 border-2 rounded-full ${isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                      {isSelected && <div className="w-2 h-2 bg-primary-foreground rounded-full mx-auto mt-0.5" />}
                    </div>
                  )}
                  <span>{option}</span>
                </div>
              </Button>
            );
          })}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button
              onClick={nextQuestion}
              disabled={currentAnswers.length === 0}
              className="flex items-center gap-2 bg-gradient-primary"
            >
              {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;