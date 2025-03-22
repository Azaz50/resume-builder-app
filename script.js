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

        resumePreview.innerHTML = `
            <div class="header">
                <img src="${photoPreview.src}" alt="Photo">
                <h1>${document.getElementById('name').value}</h1>
                <p>${document.getElementById('phone').value} | ${document.getElementById('email').value}</p>
                <p>
                    <a href="${linkedin}" target="_blank">LinkedIn</a> | 
                    <a href="${github}" target="_blank">GitHub</a>
                </p>
            </div>
            <div class="section">
                <h3>Summary</h3>
                <p>${document.getElementById('summary').value}</p>
            </div>
            <div class="section">
                <h3>Experience</h3>
                <ul>
                    ${Array.from(document.querySelectorAll('#experience-list div')).map(exp => `
                        <li>
                            <strong>${exp.children[0].value}</strong> - ${exp.children[1].value} (${exp.children[2].value})
                            <ul>
                                ${exp.children[3].value.split('\n').map(line => `<li>${line}</li>`).join('')}
                            </ul>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="section">
                <h3>Education</h3>
                <ul>
                    ${Array.from(document.querySelectorAll('#education-list div')).map(edu => `
                        <li>
                            <strong>${edu.children[0].value}</strong> - ${edu.children[1].value} (${edu.children[2].value})
                            <p>${edu.children[3].value}</p>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="section">
                <h3>Skills</h3>
                <p>${Array.from(document.querySelectorAll('.skill-tag')).map(skill => skill.textContent).join(', ')}</p>
            </div>
            <div class="section">
                <h3>Projects</h3>
                <ul>
                    ${Array.from(document.querySelectorAll('#projects-list div')).map(proj => `
                        <li>
                            <strong>${proj.children[0].value}</strong>
                            <ul>
                                ${proj.children[1].value.split('\n').map(line => `<li>${line}</li>`).join('')}
                            </ul>
                            <p>Technologies: ${proj.children[2].value}</p>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="section">
                <h3>Interests</h3>
                <p>${document.getElementById('interests').value}</p>
            </div>
        `;
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
        doc.text(document.getElementById('resume-preview').innerText, 10, 10);
        doc.save('resume.pdf');
    });
});