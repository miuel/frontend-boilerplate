'use client'

import { useRef, useState } from 'react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { IconPause, IconPlay } from '@/components/Icon'
import styles from './Video.module.scss'

export type VideoProps = React.ComponentPropsWithoutRef<'video'> & {
  src: string
  aspectRatio?: string
  showCustomControls?: boolean
}

export const Video = ({
  src,
  className,
  aspectRatio = '16 / 9',
  showCustomControls = false,
  autoPlay = false,
  muted = true,
  loop,
  playsInline = true,
  poster,
  ...rest
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    const video = videoRef.current

    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (!video || !video.duration) return

    setProgress((video.currentTime / video.duration) * 100)
  }

  const handleProgressChange = (percent: number) => {
    const video = videoRef.current

    if (!video || !video.duration) return

    video.currentTime = video.duration * (percent / 100)
    setProgress(percent)
  }

  return (
    <div
      className={clsx(styles.root, className)}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={styles.video}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        {...rest}
      />

      {showCustomControls && (
        <div className={styles.controls}>
          <Button
            variant="bare"
            type="button"
            className={styles.playButton}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <IconPause aria-hidden="true" />
            ) : (
              <IconPlay aria-hidden="true" />
            )}
          </Button>

          <Progress
            progress={progress}
            onChange={handleProgressChange}
          />
        </div>
      )}
    </div>
  )
}

type ProgressProps = {
  progress: number
  onChange?: (percent: number) => void
}

const Progress = ({ progress, onChange }: ProgressProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!onChange) return

    const rect = event.currentTarget.getBoundingClientRect()
    const position = event.clientX - rect.left
    const percent = Math.max(
      0,
      Math.min(100, (position / rect.width) * 100)
    )

    onChange(percent)
  }

  return (
    <div
      className={styles.progress}
      onClick={handleChange}
      role="slider"
      tabIndex={0}
      aria-label="Video progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div
        className={styles.progressLine}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
