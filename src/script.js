const CONFIG = {
  timeUpdateInterval: 1000,
  timeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  },
};

const profileData = {
  name: 'Adeola Busayo',
  bio: 'Front-End software engineer focused on building robust, user-centric applications and contributing to open-source projects.',
  title: 'Frontend Engineer',
  location: {
    city: 'Abuja FCT',
    country: `Nigeria `,
  },
  email: 'adeolabusayo1995@gmail.com',
  image: './assets/images/profile-card-image.png',
  social: {
    linkedin: {
      username: '',
      url: 'https://www.linkedin.com/in/adeolabusayobemdev/',
    },
    github: {
      username: 'Adebemdev',
      url: 'https://github.com/Adebemdev',
    },
    twitter: {
      username: '@bem_ade',
      url: 'https://x.com/bem_ade',
    },
  },
};

class ProfileManager {
  constructor(data) {
    this.data = data;
    this.timeInterval = null;
  }
  initialize() {
    this.updateProfile();
    this.updateTime();
    this.startTimeUpdate();
    this.updateSocialLinks();
  }

  updateProfile() {
    const elements = {
      profileName: this.data.name,
      profileTitle: this.data.title,
      profileBio: this.data.bio,
      city: this.data.location.city,
      country: this.data.location.country,
      email: this.data.email,
      profileImage: this.data.image,
    };

    // Update the DOM
    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        if (id === 'profileImage') {
          element.src = value;
        } else {
          element.textContent = value;
        }
      }
    });
  }

  updateSocialLinks() {
    Object.entries(this.data.social).forEach(([platform, data]) => {
      const link = document.getElementById(platform);
      if (link && data.url) {
        link.href = data.url;
        link.setAttribute('aria-label', `Visit ${platform} profile`);
      }
    });
  }

  updateTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
      const now = new Date();
      timeElement.textContent = `${now.toLocaleTimeString(
        'en-US',
        CONFIG.timeFormat
      )} UTC`;
    }
  }

  startTimeUpdate() {
    this.timeInterval = setInterval(
      () => this.updateTime(),
      CONFIG.timeUpdateInterval
    );
  }

  stopTimeUpdate() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const profile = new ProfileManager(profileData);
  profile.initialize();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    profile.stopTimeUpdate();
  });
});
