document.addEventListener('DOMContentLoaded', function () {
    const photoUpload = document.getElementById('photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    const addExperienceBtn = document.getElementById('add-experience');
    const addEducationBtn = document.getElementById('add-education');
    const addSkillBtn = document.getElementById('add-skill');
    const addProjectBtn = document.getElementById('add-project');
    const previewResumeBtn = document.getElementById('preview-resume');
    const downloadResumeBtn = document.getElementById('download-resume');
    const previewModal = document.getElementById('preview-modal');
    const closeModal = document.querySelector('.close');

    // Photo Upload
    photoUpload.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Add Experience
    addExperienceBtn.addEventListener('click', function () {
        const experienceList = document.getElementById('experience-list');
        const experienceEntry = document.createElement('div');
        experienceEntry.innerHTML = `
            <input type="text" placeholder="Job Title">
            <input type="text" placeholder="Company Name">
            <input type="text" placeholder="Dates">
            <textarea placeholder="Description (use bullet points)"></textarea>
        `;
        experienceList.appendChild(experienceEntry);
    });

    // Add Education
    addEducationBtn.addEventListener('click', function () {
        const educationList = document.getElementById('education-list');
        const educationEntry = document.createElement('div');
        educationEntry.innerHTML = `
            <input type="text" placeholder="Degree">
            <input type="text" placeholder="Institution">
            <input type="text" placeholder="Dates">
            <textarea placeholder="Description"></textarea>
        `;
        educationList.appendChild(educationEntry);
    });

    // Add Skill
    addSkillBtn.addEventListener('click', function () {
        const skillInput = document.getElementById('skill-input');
        const skillsList = document.getElementById('skills-list');
        if (skillInput.value.trim() !== '') {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skillInput.value.trim();
            skillsList.appendChild(skillTag);
            skillInput.value = '';
        }
    });

    // Add Project
    addProjectBtn.addEventListener('click', function () {
        const projectsList = document.getElementById('projects-list');
        const projectEntry = document.createElement('div');
        projectEntry.innerHTML = `
            <input type="text" placeholder="Project Title">
            <textarea placeholder="Description (use bullet points)"></textarea>
            <input type="text" placeholder="Technologies Used">
        `;
        projectsList.appendChild(projectEntry);
    });

    // Preview Resume
    previewResumeBtn.addEventListener('click', function () {
        const resumePreview = document.getElementById('resume-preview');
        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;

        // Generate the resume preview content
        let resumeContent = `
            <div class="header">
                <img src="${photoPreview.src}" alt="Photo">
                <h1>${document.getElementById('name').value}</h1>
                <p>${document.getElementById('phone').value} | ${document.getElementById('email').value}</p>
                <p>
                    <a href="${linkedin}" target="_blank">LinkedIn</a> | 
                    <a href="${github}" target="_blank">GitHub</a>
                </p>
            </div>
        `;

        // Summary Section
        const summary = document.getElementById('summary').value.trim();
        if (summary) {
            resumeContent += `
                <div class="section">
                    <h3>Summary</h3>
                    <p>${summary}</p>
                </div>
            `;
        }

        // Experience Section
        const experienceEntries = Array.from(document.querySelectorAll('#experience-list div'));
        if (experienceEntries.length > 0) {
            let experienceContent = '';
            experienceEntries.forEach(exp => {
                const jobTitle = exp.children[0].value.trim();
                const companyName = exp.children[1].value.trim();
                const dates = exp.children[2].value.trim();
                const description = exp.children[3].value.trim();

                if (jobTitle || companyName || dates || description) {
                    experienceContent += `
                        <li>
                            <strong>${jobTitle}</strong> - ${companyName} (${dates})
                            <ul>
                                ${description.split('\n').map(line => line.trim()).filter(line => line).map(line => `<li>${line}</li>`).join('')}
                            </ul>
                        </li>
                    `;
                }
            });

            if (experienceContent) {
                resumeContent += `
                    <div class="section">
                        <h3>Experience</h3>
                        <ul>${experienceContent}</ul>
                    </div>
                `;
            }
        }

        // Education Section
        const educationEntries = Array.from(document.querySelectorAll('#education-list div'));
        if (educationEntries.length > 0) {
            let educationContent = '';
            educationEntries.forEach(edu => {
                const degree = edu.children[0].value.trim();
                const institution = edu.children[1].value.trim();
                const dates = edu.children[2].value.trim();
                const description = edu.children[3].value.trim();

                if (degree || institution || dates || description) {
                    educationContent += `
                        <li>
                            <strong>${degree}</strong> - ${institution} (${dates})
                            <p>${description}</p>
                        </li>
                    `;
                }
            });

            if (educationContent) {
                resumeContent += `
                    <div class="section">
                        <h3>Education</h3>
                        <ul>${educationContent}</ul>
                    </div>
                `;
            }
        }

        // Skills Section
        const skills = Array.from(document.querySelectorAll('.skill-tag')).map(skill => skill.textContent.trim()).filter(skill => skill);
        if (skills.length > 0) {
            resumeContent += `
                <div class="section">
                    <h3>Skills</h3>
                    <p>${skills.join(', ')}</p>
                </div>
            `;
        }

        // Projects Section
        const projectEntries = Array.from(document.querySelectorAll('#projects-list div'));
        if (projectEntries.length > 0) {
            let projectContent = '';
            projectEntries.forEach(proj => {
                const projectTitle = proj.children[0].value.trim();
                const description = proj.children[1].value.trim();
                const technologies = proj.children[2].value.trim();

                if (projectTitle || description || technologies) {
                    projectContent += `
                        <li>
                            <strong>${projectTitle}</strong>
                            <ul>
                                ${description.split('\n').map(line => line.trim()).filter(line => line).map(line => `<li>${line}</li>`).join('')}
                            </ul>
                            <p>Technologies: ${technologies}</p>
                        </li>
                    `;
                }
            });

            if (projectContent) {
                resumeContent += `
                    <div class="section">
                        <h3>Projects</h3>
                        <ul>${projectContent}</ul>
                    </div>
                `;
            }
        }

        // Interests Section
        const interests = document.getElementById('interests').value.trim();
        if (interests) {
            resumeContent += `
                <div class="section">
                    <h3>Interests</h3>
                    <p>${interests}</p>
                </div>
            `;
        }

        // Set the resume preview content
        resumePreview.innerHTML = resumeContent;

        // Show the preview modal
        previewModal.style.display = 'block';
    });

    // Close Modal
    closeModal.addEventListener('click', function () {
        previewModal.style.display = 'none';
    });

    // Download as PDF (using jsPDF library)
    downloadResumeBtn.addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Get the resume preview content
        const resumeContent = document.getElementById('resume-preview').innerText;

        // Add the content to the PDF
        doc.text(resumeContent, 10, 10);

        // Save the PDF
        doc.save('resume.pdf');
    });
});