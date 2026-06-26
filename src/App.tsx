import { useGame } from "./hooks/useGame"
import { MenuScreen } from "./components/MenuScreen"
import { GameScreen } from "./components/GameScreen"
import { ResultScreen } from "./components/ResultScreen"

function App() {
  const game = useGame()

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 16, minHeight: "100vh" }}>
      {game.phase === "menu" && <MenuScreen onStart={game.startGame} />}
      {game.phase === "playing" && game.currentQuestion && (
        <GameScreen
          question={game.currentQuestion}
          score={game.score}
          streak={game.streak}
          timeDisplay={game.timeDisplay}
          correctCount={game.correctCount}
          totalAnswered={game.totalAnswered}
          feedback={game.feedback}
          selectedCode={game.selectedCode}
          onSubmit={game.submitAnswer}
        />
      )}
      {game.phase === "result" && (
        <ResultScreen
          score={game.finalScore}
          correctCount={game.correctCount}
          totalAnswered={game.totalAnswered}
          onPlayAgain={game.resetGame}
        />
      )}
    </div>
  )
}

export default App
