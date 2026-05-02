# ASI² LAB — Lab & Personal Website

Official website of **ASI² LAB** — *Autonomous Systems and Intelligent Interaction Laboratory* (自主系統與智慧互動實驗室), directed by **Dr. Sin-Ye Jhong (鍾昕燁)** at the Graduate Institute of Intelligent Manufacturing Technology (GIMT), National Taiwan University of Science and Technology (NTUST).

🔗 **Live site:** <https://sinyejhong.github.io>

---

## About the Lab

ASI² LAB conducts research at the intersection of **computer vision**, **deep learning**, and **embodied AI**, with a focus on building reliable autonomous systems for real-world deployment in smart manufacturing, mobility, and healthcare.

### Research Pillars

- 🛰️ **Resilient Perception & Multimodal Fusion** — All-weather autonomy through LiDAR / Radar / Camera / Thermal / DVS fusion; 2D/3D object detection; ADAS, V2X, and UAV perception.
- 🔍 **Intelligent Visual Inspection & AIoT** — Industrial defect inspection, medical imaging, biometrics, edge–cloud collaboration, and generative defect synthesis (Diffusion-based).
- 🤖 **Embodied AI & Human-Robot Interaction** — Semantic-driven autonomous mobile robots, VLM/LLM-based reasoning, open-world cognition, and human-in-the-loop reinforcement learning.

### Director

**Dr. Sin-Ye Jhong (鍾昕燁)** received his Ph.D. in Engineering Science from National Cheng Kung University (NCKU) in 2024, served as a Visiting Scholar at the University of South Florida (USF) supported by the NSTC 千里馬計畫, and is currently Assistant Professor at GIMT, NTUST. He is the recipient of **four Best Ph.D. Thesis Awards** (IEEE Tainan Section, IET Taipei Local Network, 中華民國系統學會, 中華民國消費電子學會, 2025) and serves as PI on NSTC and industry projects spanning autonomous mobile robots, ADAS, and industrial AI.

📬 [Email](mailto:sinyejhong@mail.ntust.edu.tw) · [Google Scholar](https://scholar.google.com/citations?user=0aR6RcIAAAAJ) · [ORCID](https://orcid.org/0000-0003-4481-1633) · [LinkedIn](https://www.linkedin.com/in/sin-ye-jhong-864593128) · [Faculty Profile](https://innc.ntust.edu.tw/p/405-1111-137656,c11515.php?Lang=zh-tw)

---

## Tech Stack

| Layer        | Technology                                       |
| :----------- | :----------------------------------------------- |
| Framework    | [Astro 5](https://astro.build/) (static site)    |
| UI           | React 19 islands + [Tailwind CSS 4](https://tailwindcss.com/) |
| Content      | JSON-driven (`src/data/`)                        |
| Hosting      | GitHub Pages                                     |

## Project Structure

```text
src/
├── components/    # Astro & React components (ProjectCard, NewsCarousel, AwardCard, ...)
├── data/          # JSON content (news, awards, publications, projects, members, gallery)
├── layouts/       # Shared BaseLayout
├── pages/         # Routes: about, research, projects, publications, awards, members, ...
└── styles/        # Global styles
public/
├── images/        # News, member, partner, and research photos
├── videos/        # Hero background video
└── document/      # CV PDF
```

## Local Development

```sh
npm install
npm run dev      # → http://localhost:4321
npm run build    # → ./dist/
npm run preview  # preview production build
```

## Updating Content

Most content is data-driven. Edit the JSON files under `src/data/` and the site rebuilds automatically.

| File                          | Purpose                                                                             |
| :---------------------------- | :---------------------------------------------------------------------------------- |
| `src/data/news.json`          | Home-page news carousel & feed                                                      |
| `src/data/awards.json`        | Personal Honors & Lab/Student Awards (`merit` / `paper` / `competition` / `student_merit`) |
| `src/data/publications.json`  | Publication list                                                                    |
| `src/data/projects.json`      | Industry & government projects                                                      |
| `src/data/members.json`       | Current and alumni members                                                          |
| `src/data/gallery.json`       | Photo gallery                                                                       |

Drop image files into `public/images/<section>/` and reference them as `/images/<section>/<file>`.

---

© Sin-Ye Jhong · ASI² LAB. All content and images on this site are the property of ASI² LAB unless otherwise noted.
