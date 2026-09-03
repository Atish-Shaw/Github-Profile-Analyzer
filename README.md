# GitHub Analyzer

A full-featured GitHub profile analyzer built with React — search any GitHub username to view profile stats, repository insights, language breakdowns, and compare two profiles side by side.

## Features

- 🔍 **Search** any GitHub username to view their full profile
- 📊 **Overview Dashboard** — total stars, forks, top language, member-since date
- 🥧 **Language Breakdown** — pie chart of languages used across repositories
- ⭐ **Top Repositories Chart** — bar chart of most-starred repos
- 📅 **Repo Timeline** — bar chart of repositories created per year
- 🎉 **Fun Facts** — languages known, top language share, most forked repo, description coverage
- 📁 **Repositories Table** — sortable, paginated list with language color-coding
- ⚖️ **Compare Profiles** — side-by-side comparison of two GitHub users (followers, repos, forks, top languages, most-starred repo, and an overall "winner" summary)
- ❤️ **Favourites** — save profiles for quick access later, persisted with `localStorage`
- 🌐 **Client-side routing** with React Router (shareable URLs, working browser back/forward, refresh-safe)

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for data visualization
- **Lucide React** for icons
- **GitHub REST API** for data

## Getting Started

### Prerequisites

- Node.js installed
- A [GitHub Personal Access Token](https://github.com/settings/tokens) (for higher API rate limits)

### Installation

```bash
git clone https://github.com/Atish-Shaw/Github-Profile-Analyzer.git
cd Github-Profile-Analyzer
npm install
```

### Environment Setup

Copy `.env.example` to a new file named `.env`, and add your GitHub token: