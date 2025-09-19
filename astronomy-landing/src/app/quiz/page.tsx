'use client'

import React, { useState, useEffect } from 'react'
import Container from '@/components/ui/Container'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  difficulty: 'Fácil' | 'Intermedio' | 'Difícil'
  category: string
  funFact: string
}

const questions: Question[] = [
  {
    id: 1,
    question: '¿Cuál es la estrella más cercana a la Tierra (además del Sol)?',
    options: ['Alpha Centauri', 'Próxima Centauri', 'Sirio', 'Vega'],
    correct: 1,
    explanation: 'Próxima Centauri está a 4.24 años luz de distancia y es una enana roja.',
    difficulty: 'Fácil',
    category: 'Estrellas',
    funFact: '¡Próxima Centauri es tan pequeña que si estuviera en el lugar del Sol, sería más fría que una fogata!'
  },
  {
    id: 2,
    question: '¿Cuántos planetas hay en nuestro Sistema Solar?',
    options: ['7', '8', '9', '10'],
    correct: 1,
    explanation: 'Hay 8 planetas desde que Plutón fue reclasificado como planeta enano en 2006.',
    difficulty: 'Fácil',
    category: 'Sistema Solar',
    funFact: 'Plutón aún tiene fans que quieren que vuelva a ser planeta. ¡Hasta tiene su propio día del corazón! 💔'
  },
  {
    id: 3,
    question: '¿Qué planeta tiene los vientos más rápidos del Sistema Solar?',
    options: ['Júpiter', 'Saturno', 'Urano', 'Neptuno'],
    correct: 3,
    explanation: 'Neptuno tiene vientos que pueden alcanzar hasta 2,100 km/h, más rápidos que el sonido.',
    difficulty: 'Intermedio',
    category: 'Planetas',
    funFact: '¡Los vientos de Neptuno son tan rápidos que podrían llevarte de Madrid a Barcelona en 20 minutos!'
  },
  {
    id: 4,
    question: '¿Cuál es el objeto más masivo en el Sistema Solar?',
    options: ['Júpiter', 'El Sol', 'Saturno', 'Todos los planetas juntos'],
    correct: 1,
    explanation: 'El Sol contiene el 99.86% de toda la masa del Sistema Solar.',
    difficulty: 'Fácil',
    category: 'Sistema Solar',
    funFact: 'El Sol es tan masivo que podrían caber 1.3 millones de Tierras en su interior.'
  },
  {
    id: 5,
    question: '¿Qué es un agujero negro?',
    options: [
      'Una estrella muy oscura',
      'Un planeta sin luz',
      'Una región donde la gravedad es tan fuerte que ni la luz puede escapar',
      'Un túnel en el espacio'
    ],
    correct: 2,
    explanation: 'Los agujeros negros se forman cuando estrellas masivas colapsan y crean una singularidad.',
    difficulty: 'Intermedio',
    category: 'Objetos Exóticos',
    funFact: 'Si cayeras en un agujero negro, el tiempo se ralentizaría tanto que para ti sería normal, ¡pero para los demás parecerías congelado!'
  },
  {
    id: 6,
    question: '¿Cuánto tiempo tarda la luz del Sol en llegar a la Tierra?',
    options: ['8 segundos', '8 minutos', '8 horas', '8 días'],
    correct: 1,
    explanation: 'La luz viaja a 300,000 km/s y tarda aproximadamente 8 minutos y 20 segundos.',
    difficulty: 'Fácil',
    category: 'Física Espacial',
    funFact: 'Esto significa que cuando ves el Sol, en realidad estás viendo cómo era hace 8 minutos. ¡Eres un viajero en el tiempo!'
  },
  {
    id: 7,
    question: '¿Qué luna de Saturno tiene una atmósfera más densa que la Tierra?',
    options: ['Encélado', 'Titán', 'Mimas', 'Rea'],
    correct: 1,
    explanation: 'Titán tiene una atmósfera principalmente de nitrógeno, más densa que la terrestre.',
    difficulty: 'Difícil',
    category: 'Lunas',
    funFact: 'En Titán podrías volar con alas caseras debido a la atmósfera densa y la baja gravedad. ¡Serías un superhéroe!'
  },
  {
    id: 8,
    question: '¿Cuál es la galaxia más cercana a la Vía Láctea?',
    options: ['Galaxia de Andrómeda', 'Galaxia del Triángulo', 'Galaxia Enana de Sagitario', 'Nube de Magallanes'],
    correct: 0,
    explanation: 'Andrómeda está a 2.5 millones de años luz y se acerca a nosotros.',
    difficulty: 'Intermedio',
    category: 'Galaxias',
    funFact: '¡Andrómeda y la Vía Láctea chocarán en unos 4.5 mil millones de años! Pero no te preocupes, será un choque muy suave.'
  },
  {
    id: 9,
    question: '¿Qué porcentaje del universo está compuesto por materia oscura?',
    options: ['5%', '27%', '68%', '95%'],
    correct: 1,
    explanation: 'Aproximadamente 27% es materia oscura, 68% energía oscura, y solo 5% materia ordinaria.',
    difficulty: 'Difícil',
    category: 'Cosmología',
    funFact: 'Básicamente, no tenemos ni idea de qué está hecho el 95% del universo. ¡Somos como bebés en una biblioteca cósmica!'
  },
  {
    id: 10,
    question: '¿Cuál es la temperatura en el espacio exterior?',
    options: ['-273°C', '-100°C', '0°C', 'No tiene temperatura'],
    correct: 3,
    explanation: 'El espacio vacío no tiene temperatura porque no hay materia para medir temperatura.',
    difficulty: 'Difícil',
    category: 'Física Espacial',
    funFact: 'Aunque el espacio no tiene temperatura, los objetos en el espacio pueden ser muy calientes o muy fríos dependiendo de si están al sol o en sombra.'
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; answer: number; correct: boolean }[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizStarted, setQuizStarted] = useState(false)

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1) // tiempo agotado
    }
  }, [timeLeft, quizStarted, quizCompleted, showResult])

  const startQuiz = () => {
    setQuizStarted(true)
    setTimeLeft(30)
  }

  const handleAnswer = (answerIndex: number) => {
    const question = questions[currentQuestion]
    const isCorrect = answerIndex === question.correct
    
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setUserAnswers([...userAnswers, {
      questionId: question.id,
      answer: answerIndex,
      correct: isCorrect
    }])
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    setAnsweredQuestions([...answeredQuestions, currentQuestion])
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
    setQuizCompleted(false)
    setUserAnswers([])
    setTimeLeft(30)
    setQuizStarted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return { message: "¡Eres un genio cósmico! 🚀", emoji: "🌟", color: "text-yellow-400" }
    if (percentage >= 80) return { message: "¡Excelente conocimiento espacial! 🛰️", emoji: "🎯", color: "text-green-400" }
    if (percentage >= 70) return { message: "¡Muy bien! Eres un buen astronauta. 👨‍🚀", emoji: "🚀", color: "text-blue-400" }
    if (percentage >= 60) return { message: "No está mal, sigue explorando. 🔭", emoji: "📡", color: "text-purple-400" }
    return { message: "¡Necesitas más entrenamiento espacial! 📚", emoji: "🌍", color: "text-orange-400" }
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-indigo-900/20 to-black flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              🧠 Quiz Espacial
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              ¿Crees que sabes todo sobre el universo? ¡Pon a prueba tus conocimientos cósmicos con este quiz interactivo!
            </p>
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 max-w-md mx-auto mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">📋 Instrucciones</h3>
              <ul className="text-gray-300 text-left space-y-2">
                <li>• {questions.length} preguntas sobre astronomía</li>
                <li>• 30 segundos por pregunta</li>
                <li>• Diferentes niveles de dificultad</li>
                <li>• ¡Datos curiosos en cada respuesta!</li>
              </ul>
            </div>
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
            >
              🚀 ¡Empezar Quiz!
            </button>
          </div>
        </Container>
      </div>
    )
  }

  if (quizCompleted) {
    const scoreInfo = getScoreMessage()
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Container>
          <div className="py-20 text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎉 ¡Quiz Completado!
            </h1>
            
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 max-w-2xl mx-auto mb-8">
              <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
              <h2 className={`text-3xl font-bold mb-4 ${scoreInfo.color}`}>
                {score}/{questions.length} respuestas correctas
              </h2>
              <p className="text-xl text-white mb-6">{scoreInfo.message}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                  <div className="text-sm text-gray-400">Correctas</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-400">{questions.length - score}</div>
                  <div className="text-sm text-gray-400">Incorrectas</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">{Math.round((score/questions.length)*100)}%</div>
                  <div className="text-sm text-gray-400">Precisión</div>
                </div>
              </div>
            </div>

            {/* Review Answers */}
            <div className="max-w-4xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">📖 Revisión de Respuestas</h3>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = userAnswers.find(a => a.questionId === question.id)
                  return (
                    <div key={question.id} className="bg-white/5 rounded-lg p-4 text-left">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white">{index + 1}. {question.question}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          userAnswer?.correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {userAnswer?.correct ? '✓ Correcto' : '✗ Incorrecto'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 mb-2">
                        <strong>Tu respuesta:</strong> {userAnswer?.answer !== -1 ? question.options[userAnswer?.answer || 0] : 'Tiempo agotado'}
                      </div>
                      <div className="text-sm text-gray-300 mb-2">
                        <strong>Respuesta correcta:</strong> {question.options[question.correct]}
                      </div>
                      <div className="text-xs text-blue-400">{question.explanation}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={restartQuiz}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              🔄 Intentar de Nuevo
            </button>
          </div>
        </Container>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black">
      <Container>
        <div className="py-20">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
                ⏰ {timeLeft}s
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  question.difficulty === 'Fácil' ? 'bg-green-500/20 text-green-400' :
                  question.difficulty === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {question.difficulty}
                </span>
                <span className="text-gray-400 text-sm">{question.category}</span>
              </div>

              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {question.question}
              </h2>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                      showResult
                        ? index === question.correct
                          ? 'bg-gradient-to-r from-green-500/30 to-green-600/30 border border-green-400/50'
                          : selectedAnswer === index
                            ? 'bg-gradient-to-r from-red-500/30 to-red-600/30 border border-red-400/50'
                            : 'bg-white/5 border border-white/10'
                        : selectedAnswer === index
                          ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-white">{option}</span>
                      {showResult && index === question.correct && (
                        <span className="ml-auto text-green-400">✓</span>
                      )}
                      {showResult && selectedAnswer === index && index !== question.correct && (
                        <span className="ml-auto text-red-400">✗</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Result */}
              {showResult && (
                <div className="bg-white/10 rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    {selectedAnswer === question.correct ? (
                      <div className="text-green-400 text-xl">🎉 ¡Correcto!</div>
                    ) : selectedAnswer === -1 ? (
                      <div className="text-orange-400 text-xl">⏰ ¡Tiempo agotado!</div>
                    ) : (
                      <div className="text-red-400 text-xl">❌ Incorrecto</div>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">{question.explanation}</p>
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                    <h4 className="text-blue-400 font-semibold mb-2">💡 Dato Curioso:</h4>
                    <p className="text-gray-300 text-sm">{question.funFact}</p>
                  </div>
                </div>
              )}

              {/* Next Button */}
              {showResult && (
                <div className="text-center">
                  <button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'} →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
