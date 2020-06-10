const preview = document.createElement('div')
preview.id = 'dsh-preview'
const body = document.getElementsByTagName('body')[0]
body.appendChild(preview)

const icon = document.createElement('div')
icon.id = 'dsh-icon'
const svg = document.createElement('img')
svg.src = chrome.extension.getURL('img/webIcon.svg')
icon.appendChild(svg)

let currentShot = null
let iconShot = null

const showPreview = () => {
  iconShot = currentShot
  const videoURL = iconShot.getAttribute('data-video-teaser-xlarge')
  if (videoURL) {
    const video = document.createElement('video')
    video.src = videoURL
    video.autoplay = true
    video.loop = true
    video.muted = true
    video.addEventListener('loadeddata', () => {
      preview.innerHTML = ''
      if (!iconShot || iconShot !== currentShot) return
      preview.appendChild(video)
    })
    return
  }
  const picUrl = currentShot.querySelector('picture source').srcset.replace('_still_2x', '')
  const img = document.createElement('img')
  img.src = picUrl
  img.onload = () => {
    preview.innerHTML = ''
    if (!iconShot || iconShot !== currentShot) return
    preview.appendChild(img)
  }
}

body.addEventListener('mousemove', (e) => {
  const target = e.target
  if (target.id === 'dsh-icon') {
    return showPreview()
  }
  const shot = target.closest('.dribbble')
  if (shot) {
    preview.innerHTML = ''
    iconShot = null
    currentShot = shot
    currentShot.appendChild(icon)
    return
  }
  preview.innerHTML = ''
  currentShot && currentShot.removeChild(icon)
  currentShot = null
  iconShot = null
})
