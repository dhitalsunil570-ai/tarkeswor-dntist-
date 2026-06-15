// Tarkeswor Dentist - Dynamic Content Loader
const API = '/api/public';

async function apiFetch(path) {
  try {
    const r = await fetch(API + path);
    if (!r.ok) return null;
    return r.json();
  } catch { return null; }
}

function star(n) {
  return Array.from({length:5},(_,i)=>
    `<i class="fas fa-star${i<n?'':'-half-alt'} text-warning"></i>`
  ).join('');
}

// Apply site settings to all pages
async function applySettings() {
  const s = await apiFetch('/settings');
  if (!s) return;
  // SEO
  if (s.seo_title) document.title = s.seo_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && s.seo_description) metaDesc.setAttribute('content', s.seo_description);
  const metaKw = document.querySelector('meta[name="keywords"]');
  if (metaKw && s.seo_keywords) metaKw.setAttribute('content', s.seo_keywords);
  // Topbar
  const phoneEl = document.getElementById('site-phone');
  if (phoneEl) { phoneEl.textContent = s.phone || ''; phoneEl.href = 'tel:'+s.phone; }
  const emailEl = document.getElementById('site-email');
  if (emailEl) { emailEl.textContent = s.email || ''; emailEl.href = 'mailto:'+s.email; }
  const addrEl = document.getElementById('site-address');
  if (addrEl) { addrEl.textContent = s.address || ''; addrEl.href = s.location_url || '#'; }
  // Social
  const fbEl = document.getElementById('site-facebook');
  if (fbEl) fbEl.href = s.facebook || '#';
  const twEl = document.getElementById('site-twitter');
  if (twEl) twEl.href = s.twitter || '#';
  const igEl = document.getElementById('site-instagram');
  if (igEl) igEl.href = s.instagram || '#';
  const liEl = document.getElementById('site-linkedin');
  if (liEl) liEl.href = s.linkedin || '#';
  // Logo
  const logoTextEl = document.getElementById('site-logo-text');
  if (logoTextEl) logoTextEl.textContent = s.logo_text || 'Tarkeswor Dentist';
  const logoImgEl = document.getElementById('site-logo-img');
  if (logoImgEl && s.logo_url) {
    logoImgEl.src = s.logo_url;
    logoImgEl.style.display = '';
    const logoTxt = document.getElementById('site-logo-text-container');
    if (logoTxt) logoTxt.style.display = 'none';
  }
  // Footer
  const footerNameEls = document.querySelectorAll('.footer-site-name');
  footerNameEls.forEach(el => el.textContent = s.site_name || 'Tarkeswor Dentist Pvt. Ltd.');
  const footerPhoneEl = document.getElementById('footer-phone');
  if (footerPhoneEl) { footerPhoneEl.textContent = s.phone; footerPhoneEl.href = 'tel:'+s.phone; }
  const footerEmailEl = document.getElementById('footer-email');
  if (footerEmailEl) { footerEmailEl.textContent = s.email; footerEmailEl.href = 'mailto:'+s.email; }
  const footerAddrEl = document.getElementById('footer-address');
  if (footerAddrEl) footerAddrEl.textContent = s.address;
  const footerLocEl = document.getElementById('footer-location');
  if (footerLocEl) footerLocEl.href = s.location_url || '#';
  // Social footer
  ['facebook','twitter','instagram','linkedin'].forEach(sn => {
    const el = document.getElementById('footer-'+sn);
    if (el) el.href = s[sn] || '#';
  });
  window._siteSettings = s;
}

// Load banner/carousel on index.html
async function loadBanner() {
  const c = document.getElementById('hero-carousel');
  if (!c) return;
  const s = window._siteSettings || await apiFetch('/settings');
  if (!s) return;
  c.innerHTML = `
    <div class="header-carousel-item">
      <img src="${s.banner_image1||'img/carousel-1.jpg'}" class="img-fluid w-100" alt="">
      <div class="carousel-caption"><div class="carousel-caption-content p-3">
        <h5 class="text-white text-uppercase fw-bold mb-4" style="letter-spacing:3px;">${s.banner_subtitle||'Dental Care Center'}</h5>
        <h1 class="display-1 text-capitalize text-white mb-4">${s.banner_title||'Best Dental Care For Your Family'}</h1>
        <p class="mb-5 fs-5">${s.banner_text||'Professional dental services.'}</p>
        <a class="btn btn-primary rounded-pill text-white py-3 px-5" href="appointment.html">Book Appointment</a>
      </div></div>
    </div>
    <div class="header-carousel-item">
      <img src="${s.banner_image2||'img/carousel-2.jpg'}" class="img-fluid w-100" alt="">
      <div class="carousel-caption"><div class="carousel-caption-content p-3">
        <h5 class="text-white text-uppercase fw-bold mb-4" style="letter-spacing:3px;">${s.banner_subtitle||'Dental Care Center'}</h5>
        <h1 class="display-1 text-capitalize text-white mb-4">${s.banner_title||'Best Dental Care For Your Family'}</h1>
        <p class="mb-5 fs-5 animated slideInDown">${s.banner_text||'Professional dental services.'}</p>
        <a class="btn btn-primary rounded-pill text-white py-3 px-5" href="appointment.html">Book Appointment</a>
      </div></div>
    </div>`;
  if (window.$) $('.header-carousel').owlCarousel({autoplay:true,smartSpeed:1500,loop:true,nav:true,dots:false,items:1,autoplayTimeout:7000});
}

// Load about section
async function loadAbout() {
  const el = document.getElementById('about-section');
  if (!el) return;
  const s = window._siteSettings || await apiFetch('/settings');
  if (!s) return;
  el.innerHTML = `
    <div class="col-lg-5 wow fadeInLeft" data-wow-delay="0.2s">
      <div class="about-img pb-5 ps-5">
        <img id="about-img1" src="${s.about_image1||'img/about-1.jpg'}" class="img-fluid rounded w-100" style="object-fit:cover;" alt="">
        <div class="about-img-inner">
          <img id="about-img2" src="${s.about_image2||'img/about-2.jpg'}" class="img-fluid rounded-circle w-100 h-100" alt="">
        </div>
        <div class="about-experience">${s.about_experience||'15 years experience'}</div>
      </div>
    </div>
    <div class="col-lg-7 wow fadeInRight" data-wow-delay="0.4s">
      <div class="section-title text-start mb-5">
        <h4 class="sub-title pe-3 mb-0">About Us</h4>
        <h1 class="display-3 mb-4" id="about-title">${s.about_title||'We are Ready to Help.'}</h1>
        <p class="mb-4" id="about-text">${s.about_text||''}</p>
        <div class="mb-4">
          <p class="text-secondary"><i class="fa fa-check text-primary me-2"></i>${s.about_check1||''}</p>
          <p class="text-secondary"><i class="fa fa-check text-primary me-2"></i>${s.about_check2||''}</p>
          <p class="text-secondary"><i class="fa fa-check text-primary me-2"></i>${s.about_check3||''}</p>
        </div>
        <a href="about.html" class="btn btn-primary rounded-pill text-white py-3 px-5">Discover More</a>
      </div>
    </div>`;
}

// Load services
async function loadServices() {
  const el = document.getElementById('services-grid');
  if (!el) return;
  const data = await apiFetch('/services');
  if (!data || !data.length) return;
  el.innerHTML = data.map(s => `
    <div class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp">
      <div class="service-item rounded">
        <div class="service-img rounded-top">
          <img src="${s.image}" class="img-fluid rounded-top w-100" alt="${s.title}">
        </div>
        <div class="service-content rounded-bottom bg-light p-4">
          <div class="service-content-inner">
            <h5 class="mb-4">${s.title}</h5>
            <p class="mb-4">${s.description}</p>
            <a href="service.html" class="btn btn-primary rounded-pill text-white py-2 px-4 mb-2">Read More</a>
          </div>
        </div>
      </div>
    </div>`).join('');
}

// Load features (why choose us)
async function loadFeatures() {
  const el = document.getElementById('features-grid');
  if (!el) return;
  const data = await apiFetch('/features');
  if (!data || !data.length) return;
  el.innerHTML = data.map(f => `
    <div class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp">
      <div class="row-cols-1 feature-item p-4">
        <div class="col-12">
          <div class="feature-icon mb-4">
            <div class="p-3 d-inline-flex bg-white rounded">
              <i class="${f.icon} fa-4x text-primary"></i>
            </div>
          </div>
          <div class="feature-content d-flex flex-column">
            <h5 class="mb-4">${f.title}</h5>
            <p class="mb-0">${f.description}</p>
          </div>
        </div>
      </div>
    </div>`).join('');
}

// Load solutions section
async function loadSolutions() {
  const el = document.getElementById('solutions-section');
  if (!el) return;
  const data = await apiFetch('/solutions');
  if (!data || !data.meta) return;
  const {meta, items} = data;
  el.querySelector('#sol-subtitle') && (el.querySelector('#sol-subtitle').textContent = meta.subtitle);
  el.querySelector('#sol-title') && (el.querySelector('#sol-title').textContent = meta.title);
  el.querySelector('#sol-desc') && (el.querySelector('#sol-desc').textContent = meta.description);
  el.querySelector('#sol-video-img') && (el.querySelector('#sol-video-img').src = meta.imageUrl);
  const btn = el.querySelector('#sol-video-btn');
  if (btn) btn.setAttribute('data-src', meta.videoUrl);
  const itemsEl = el.querySelector('#sol-items');
  if (itemsEl && items.length) {
    itemsEl.innerHTML = items.map(it => `
      <div class="mb-4">
        <h5 class="mb-3"><i class="fa fa-check text-primary me-2"></i>${it.title}</h5>
        <p class="mb-0">${it.description}</p>
      </div>`).join('');
  }
}

// Load doctors
async function loadDoctors() {
  const el = document.getElementById('doctors-grid');
  if (!el) return;
  const data = await apiFetch('/doctors');
  if (!data || !data.length) return;
  el.innerHTML = data.map(d => `
    <div class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp">
      <div class="team-item rounded overflow-hidden" style="cursor:pointer;" onclick="showDoctorModal(${d.id})">
        <div class="team-img rounded-top">
          <img src="${d.avatarUrl}" class="img-fluid w-100" alt="${d.name}">
          <div class="team-social">
            ${d.facebook ? `<a href="${d.facebook}" target="_blank" class="btn btn-square btn-primary rounded-circle m-1"><i class="fab fa-facebook-f"></i></a>` : ''}
            ${d.twitter ? `<a href="${d.twitter}" target="_blank" class="btn btn-square btn-primary rounded-circle m-1"><i class="fab fa-twitter"></i></a>` : ''}
            ${d.instagram ? `<a href="${d.instagram}" target="_blank" class="btn btn-square btn-primary rounded-circle m-1"><i class="fab fa-instagram"></i></a>` : ''}
            ${d.linkedin ? `<a href="${d.linkedin}" target="_blank" class="btn btn-square btn-primary rounded-circle m-1"><i class="fab fa-linkedin-in"></i></a>` : ''}
          </div>
        </div>
        <div class="team-content text-center p-4">
          <h5>${d.name}</h5>
          <p class="text-primary mb-0">${d.category}</p>
          <small class="text-muted">${d.level}</small>
        </div>
      </div>
    </div>`).join('');
}

// Show doctor detail modal
window.showDoctorModal = async function(id) {
  const d = await apiFetch('/doctors/'+id);
  if (!d) return;
  let modal = document.getElementById('doctorDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'doctorDetailModal';
    modal.innerHTML = `<div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="ddm-name"></h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="row g-4">
            <div class="col-md-4 text-center">
              <img id="ddm-avatar" class="img-fluid rounded-circle mb-3" style="width:150px;height:150px;object-fit:cover;" alt="">
            </div>
            <div class="col-md-8" id="ddm-info"></div>
          </div>
          <div class="mt-3" id="ddm-detail"></div>
        </div>
      </div>
    </div>`;
    modal.className = 'modal fade';
    modal.setAttribute('tabindex','-1');
    document.body.appendChild(modal);
  }
  modal.querySelector('#ddm-name').textContent = d.name;
  modal.querySelector('#ddm-avatar').src = d.avatarUrl;
  modal.querySelector('#ddm-info').innerHTML = `
    <p><strong><i class="fas fa-stethoscope text-primary me-2"></i>Category:</strong> ${d.category}</p>
    <p><strong><i class="fas fa-user-md text-primary me-2"></i>Level:</strong> ${d.level}</p>
    <p><strong><i class="fas fa-clock text-primary me-2"></i>Experience:</strong> ${d.experience}</p>
    <p><strong><i class="fas fa-map-marker-alt text-primary me-2"></i>Address:</strong> ${d.address}</p>
    <p><strong><i class="fas fa-phone text-primary me-2"></i>Phone:</strong> <a href="tel:${d.phone}">${d.phone}</a></p>
    <p><strong><i class="fas fa-envelope text-primary me-2"></i>Email:</strong> <a href="mailto:${d.email}">${d.email}</a></p>
    <div class="d-flex gap-2 mt-2">
      ${d.facebook ? `<a href="${d.facebook}" target="_blank" class="btn btn-sm btn-primary"><i class="fab fa-facebook-f"></i></a>` : ''}
      ${d.twitter ? `<a href="${d.twitter}" target="_blank" class="btn btn-sm btn-info text-white"><i class="fab fa-twitter"></i></a>` : ''}
      ${d.instagram ? `<a href="${d.instagram}" target="_blank" class="btn btn-sm btn-danger"><i class="fab fa-instagram"></i></a>` : ''}
      ${d.linkedin ? `<a href="${d.linkedin}" target="_blank" class="btn btn-sm btn-secondary"><i class="fab fa-linkedin-in"></i></a>` : ''}
    </div>`;
  modal.querySelector('#ddm-detail').innerHTML = d.detail ? `<hr><h6>About Dr. ${d.name}</h6><p>${d.detail}</p>` : '';
  new bootstrap.Modal(modal).show();
};

// Load reviews/testimonials
async function loadReviews() {
  const el = document.getElementById('reviews-carousel');
  if (!el) return;
  const data = await apiFetch('/reviews');
  if (!data || !data.length) return;
  el.innerHTML = data.map(r => `
    <div class="testimonial-item text-center rounded p-4">
      <div class="testimonial-img rounded-circle mb-3 mx-auto" style="width:80px;height:80px;overflow:hidden;">
        <img src="${r.image}" class="img-fluid" alt="${r.name}" style="object-fit:cover;width:100%;height:100%;">
      </div>
      <p class="fs-5 mb-4">${r.review}</p>
      <div class="mb-2">${star(r.rating)}</div>
      <h5 class="mb-1">${r.name}</h5>
      <p class="text-primary mb-0">${r.role}</p>
    </div>`).join('');
  if (window.$) $(el).owlCarousel({autoplay:true,smartSpeed:1000,loop:true,nav:false,dots:true,items:1,autoplayTimeout:5000});
}

// Load gallery
async function loadGallery() {
  const el = document.getElementById('gallery-grid');
  if (!el) return;
  const data = await apiFetch('/gallery');
  if (!data || !data.length) return;
  el.innerHTML = data.map(g => `
    <div class="col-md-6 col-lg-3 wow fadeInUp">
      <div class="gallery-item rounded overflow-hidden">
        <img src="${g.imageUrl}" class="img-fluid w-100" style="height:220px;object-fit:cover;" alt="${g.caption}">
        ${g.caption ? `<div class="p-2 text-center small text-muted">${g.caption}</div>` : ''}
      </div>
    </div>`).join('');
}

// Load blog posts
async function loadBlog() {
  const el = document.getElementById('blog-grid');
  if (!el) return;
  const data = await apiFetch('/blog');
  if (!data || !data.length) return;
  el.innerHTML = data.map(b => `
    <div class="col-md-6 col-lg-4 wow fadeInUp">
      <div class="blog-item rounded overflow-hidden">
        <div class="blog-img"><img src="${b.image}" class="img-fluid w-100" style="height:220px;object-fit:cover;" alt="${b.title}"></div>
        <div class="p-4">
          <div class="mb-2 text-muted small"><i class="fas fa-user text-primary me-1"></i>${b.author} &nbsp;<i class="fas fa-calendar text-primary me-1 ms-2"></i>${b.publishedAt}</div>
          <h5 class="mb-3">${b.title}</h5>
          <p class="mb-3 text-muted">${b.excerpt}</p>
          <a href="#" class="btn btn-sm btn-primary rounded-pill">Read More</a>
        </div>
      </div>
    </div>`).join('');
}

// Handle booking form
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Load departments from services
  apiFetch('/services').then(svcs => {
    const deptSelect = form.querySelector('#booking-dept');
    if (deptSelect && svcs) {
      deptSelect.innerHTML = '<option value="">Select Department</option>' +
        svcs.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      name: form.querySelector('#book-name')?.value || '',
      email: form.querySelector('#book-email')?.value || '',
      phone: form.querySelector('#book-phone')?.value || '',
      gender: form.querySelector('#book-gender')?.value || '',
      date: form.querySelector('#book-date')?.value || '',
      department: form.querySelector('#booking-dept')?.value || '',
      comment: form.querySelector('#book-comment')?.value || '',
    };

    try {
      const r = await fetch('/api/bookings', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
      const result = await r.json();
      if (result.success) {
        alert('Appointment booked successfully! Redirecting to WhatsApp...');
        form.reset();
        if (result.whatsappUrl) window.open(result.whatsappUrl, '_blank');
      } else {
        alert('Error: ' + (result.error || 'Failed to book'));
      }
    } catch { alert('Network error. Please try again.'); }
    finally { btn.textContent = origText; btn.disabled = false; }
  });
}

// Init all on page load
document.addEventListener('DOMContentLoaded', async () => {
  await applySettings();
  await Promise.all([
    loadBanner(),
    loadAbout(),
    loadServices(),
    loadFeatures(),
    loadSolutions(),
    loadDoctors(),
    loadReviews(),
    loadGallery(),
    loadBlog(),
  ]);
  initBookingForm();
});
