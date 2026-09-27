import { describe, expect, it } from 'vitest'
import { videoId } from './video'

describe('official YouTube embed ID', () => {
  it('supports the supplied demo URL and ordinary watch links', () => {
    expect(videoId('https://youtu.be/6iAhu9PYDss?si=Q1rUGJdmA0S03oWM')).toBe('6iAhu9PYDss')
    expect(videoId('https://www.youtube.com/watch?v=6iAhu9PYDss')).toBe('6iAhu9PYDss')
  })
  it('rejects lookalike hosts and malformed IDs', () => {
    expect(videoId('https://youtube.com.evil.test/watch?v=6iAhu9PYDss')).toBeNull()
    expect(videoId('https://youtu.be/not-an-id')).toBeNull()
  })
})
