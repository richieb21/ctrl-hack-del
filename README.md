# Acceleratr

Acceleratr is a smart resume-building tool that instantly customizes your resume for any job application, helping job seekers stand out with minimal effort.

## Features

- **Instant Resume Customization**: Generate tailored resumes in PDF format based on your master resume
- **Smart Keyword Matching**: Uses NLP and RAKE to identify and prioritize relevant experience
- **Professional PDF Output**: LaTeX-powered formatting ensures polished, professional results
- **Secure Authentication**: OAuth integration for safe and streamlined access
- **User-Friendly Interface**: Modern, responsive design built with React and Tailwind CSS

## How It Works

1. **Upload & Extraction**

   - Upload your master resume
   - Input target job posting
   - RAKE model identifies and ranks keywords in both documents

2. **Keyword Matching with NLP**

   - Applies cosine similarity to measure relevance between resume and job posting
   - Identifies and prioritizes most relevant skills and experiences

3. **Relevance Ranking**
   - Ranks resume points by relevance
   - Optimizes content for ATS performance
   - Suggests strong relevant experiences and projects

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask (Python)
- **Database**: MongoDB
- **Authentication**: JWT, Bcrypt
- **PDF Generation**: LaTeX
- **Natural Language Processing**: RAKE, Cosine Similarity

## Installation

Make sure to install latex on your system before running the backend.

For frontend, run `npm install` and `npm start`.

For backend, run `pip install -r requirements.txt` and `flask run`.

## Usage

1. Create an account
2. Complete onboarding
3. Input target job posting
4. Tailor your resume
5. Preview/Download your resume

## Future Development

- AI-driven interview question scraping
- Customized interview preparation tools
- Enhanced job posting analysis
- Expanded resume customization options

## Team

Daniel Zhao - NLP, Resume Generation
Yiyan Huang - Dashboard, Design
William Zhou - Backend, Resume Tailoring/PDF Generation
Richard Bai - Authentication, Resume Tailoring/PDF Generation
