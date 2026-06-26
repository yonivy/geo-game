import { useGame } from "./hooks/useGame"
import { MenuScreen } from "./components/MenuScreen"
import { GameScreen } from "./components/GameScreen"
import { ResultScreen } from "./components/ResultScreen"
import { HistoryScreen } from "./components/HistoryScreen"

function App() {
  const game = useGame()

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 16, minHeight: "100vh" }}>
      {game.phase === "menu" && (
        <MenuScreen onStart={game.startGame} onHistory={game.showHistory} />
      )}
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
          onQuit={game.quitGame}
        />
      )}
      {game.phase === "result" && (
        <ResultScreen
          score={game.finalScore}
          correctCount={game.correctCount}
          totalAnswered={game.totalAnswered}
          onPlayAgain={game.goToMenu}
        />
      )}
      {game.phase === "history" && (
        <HistoryScreen onBack={game.goToMenu} />
      )}
    </div>
  )
}

export default App
