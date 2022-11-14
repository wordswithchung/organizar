import * as React from "react";
import Container from "@mui/material/Container";
import { SENTENCES, SentenceStructure } from "../misc/data";
import { shuffleArray } from "../misc/helper";
import { Button, Chip, Divider, Switch } from "@mui/material";
import ResponsiveAppBar from "../src/AppBar";
import { Stack } from "@mui/system";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DoNotDisturbOutlinedIcon from "@mui/icons-material/DoNotDisturbOutlined";

export default function Home() {
  const [text, setText] = React.useState<SentenceStructure | null>(null);
  const [original, setOriginal] = React.useState<string[]>([]);
  const [answer, setAnswer] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<"neutral" | "right" | "wrong">(
    "neutral"
  );
  const [showTranslation, setShowTranslation] = React.useState<boolean>(false);

  function getNewPhrase() {
    const randomValue = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    setText(randomValue);
    const newOriginal = randomValue.pt.split(" ");
    shuffleArray(newOriginal);
    setOriginal(newOriginal);
    setAnswer([]);
    setStatus("neutral");
  }

  React.useEffect(() => {
    getNewPhrase();
  }, []);

  if (!text) {
    return null;
  }

  function handleOriginalClick(text: string) {
    const newOriginal = original.filter(
      (w) => w.toLowerCase() !== text.toLowerCase()
    );
    setOriginal(newOriginal);

    const newAnswer = [...answer, text];
    setAnswer(newAnswer);
  }

  function handleAnswerClick(value: string, index: number) {
    const newAnswer = [...answer];
    newAnswer.splice(index, 1);
    setAnswer(newAnswer);

    const newOriginal = [...original, value];
    setOriginal(newOriginal);
  }

  function checkAnswer() {
    if (!text?.pt) {
      return;
    }

    if (status === "right") {
      getNewPhrase();
      return;
    }

    const ans = answer.join(" ").includes(text.pt);
    setStatus(!!ans ? "right" : "wrong");
  }

  return (
    <Container maxWidth={false} disableGutters>
      <ResponsiveAppBar />
      <Stack flexDirection="row" justifyContent="center" minHeight={70}>
        {original.map((word, index) => {
          return (
            <Button
              variant="text"
              key={index}
              onClick={() => handleOriginalClick(word)}
              sx={{ textTransform: "none" }}
            >
              {word}
            </Button>
          );
        })}
      </Stack>
      <Stack flexDirection="row" justifyContent="center" minHeight={70}>
        {answer.map((word, index) => {
          return (
            <Button
              variant="text"
              color="secondary"
              key={index}
              onClick={() => handleAnswerClick(word, index)}
              sx={{ textTransform: "none" }}
            >
              {word}
            </Button>
          );
        })}
      </Stack>
      <Stack flexDirection="row" justifyContent="center">
        <Button
          variant={"contained"}
          color={
            status === "neutral"
              ? "primary"
              : status === "right"
              ? "success"
              : "error"
          }
          onClick={() => checkAnswer()}
          startIcon={
            status === "right" ? (
              <CheckCircleOutlinedIcon />
            ) : status === "neutral" ? (
              <></>
            ) : (
              <DoNotDisturbOutlinedIcon />
            )
          }
        >
          {status === "neutral"
            ? "Check answer"
            : status === "right"
            ? "Next phrase"
            : "Try again"}
        </Button>
      </Stack>
      <Stack flexDirection="row" justifyContent="center">
        <Button
          variant="text"
          onClick={() => setShowTranslation(!showTranslation)}
          sx={{ textTransform: "none" }}
        >
          {showTranslation ? text.en : "Show translation"}
        </Button>
      </Stack>
    </Container>
  );
}
