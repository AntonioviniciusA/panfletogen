"use client";
import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

export default function AudioEditor() {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const fileInputRef = useRef(null);

  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (audioFile) {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#60a5fa",
        progressColor: "#2563eb",
        cursorColor: "#000",
        height: 120,
      });

      wavesurfer.current.load(URL.createObjectURL(audioFile));

      wavesurfer.current.on("ready", () => {
        const dur = wavesurfer.current.getDuration();
        setDuration(dur);
        setEnd(dur);
      });
    }
  }, [audioFile]);

  const handleCut = async () => {
    if (!audioFile) return;
    setLoading(true);

    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }

    const fileName = "input.mp3";
    const outFile = "output.mp3";

    await ffmpeg.writeFile(fileName, await fetchFile(audioFile));

    await ffmpeg.exec([
      "-i",
      fileName,
      "-ss",
      start.toString(),
      "-to",
      end.toString(),
      "-c",
      "copy",
      outFile,
    ]);

    const data = await ffmpeg.readFile(outFile);
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "audio/mpeg" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "recorte.mp3";
    a.click();

    setLoading(false);
  };

  //converter segundos para mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center pt-8 mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          Editor de Áudio da laninha
        </h1>
        <p className="text-blue-700 text-lg">sla oq por aq vei</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border border-blue-200 rounded-lg shadow-lg">
          <div className="bg-blue-50 border-b border-blue-200 p-4">
            <h2 className="text-blue-900 flex items-center gap-2 font-semibold text-lg">
              Upload do Áudio
            </h2>
          </div>
          <div className="p-6">
            <div
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setAudioFile(e.dataTransfer.files[0]);
                }
              }}
              onDragOver={(e) => e.preventDefault()}>
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                <p className="mb-2 text-sm text-blue-700 text-center">
                  <span className="font-semibold">
                    Clique ou arraste e solte
                  </span>{" "}
                  o arquivo de áudio aqui
                </p>
                <p className="text-xs text-blue-500">MP3, WAV, OGG...</p>
              </label>

              <input
                id="file-upload"
                type="file"
                accept="audio/*"
                ref={fileInputRef}
                onChange={(e) => setAudioFile(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 pt-6 pb-12">
        <div className="border border-blue-200 rounded-lg shadow-lg">
          <div className="bg-blue-50 border-b border-blue-200 p-4">
            <h2 className="text-blue-900 flex items-center gap-2 font-semibold text-lg">
              Upload do Áudio
            </h2>
          </div>

          <div className="p-6">
            <div
              ref={waveformRef}
              className="w-full bg-gray-800 rounded-lg"></div>

            {duration > 0 && (
              <>
                <div className="flex flex-col gap-3 my-4">
                  <label>
                    Início: {formatTime(start)}
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      step="0.1"
                      value={start}
                      onChange={(e) => setStart(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </label>

                  <label>
                    Fim: {formatTime(end)}
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      step="0.1"
                      value={end}
                      onChange={(e) => setEnd(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </label>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => wavesurfer.current.play(start, end)}
                    className="px-4 py-2 bg-blue-500 text-white rounded">
                    Reproduzir trecho
                  </button>
                  <button
                    onClick={() => wavesurfer.current.play()}
                    className="px-4 py-2 bg-blue-400 text-white rounded">
                    Reproduzir tudo
                  </button>
                  <button
                    onClick={handleCut}
                    disabled={loading}
                    className="px-4 py-2 bg-green-500 text-white rounded">
                    {loading ? "Processando..." : " Baixar MP3"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
