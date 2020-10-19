import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/Index.vue';
import school from '../views/School.vue';
import schoolDetail from '../views/SchoolDetail.vue';
import detailArticle from '../views/DetailArticle.vue';
import jobVacancy from '../views/JobVacancy.vue';
import detailJobVacancy from '../views/DetailJobVacancy.vue';
import jobSeeker from '../views/JobSeeker.vue';
import jobSeekerInternship from '../views/JobSeekerInternship.vue';
import jobSeekerInformal from '../views/JobSeekerInformal.vue';
import jobSeekerProfesional from '../views/JobSeekerProfesional.vue';
import detailJobSeeker from '../views/DetailJobSeeker.vue';
import faq from '../views/FAQ.vue';
import article from '../views/Article.vue';
import aboutUs from '../views/AboutUs.vue';
import activateAccount from '../views/ActivateAccount.vue';
import registerAccount from '../views/RegisterAccount.vue';
import loginJobSeeker from '../views/LoginJobSeeker.vue';
import loginCompany from '../views/LoginCompany.vue';
import loginAdmin from '../views/LoginAdmin.vue';
import dashboard from '../views/Dashboard.vue';
import faqPanel from '../views/FAQpanel.vue';
import changePassword from '../views/ChangePassword.vue';
import aboutUsPanel from '../views/AboutUsPanel.vue';
import contact from '../views/Contact.vue';
import articlePanel from '../views/ArticlePanel.vue';
import schoolPanel from '../views/SchoolPanel.vue';
import jobSeekerPanel from '../views/JobSeekerPanel.vue';
import professionalPanel from '../views/ProfessionalPanel.vue';
import internshipPanel from '../views/InternshipPanel.vue';
import informalPanel from '../views/InformalPanel.vue';
import UMKMPanel from '../views/UMKMPanel.vue';
import mitraPanel from '../views/MitraPanel.vue';
import announcementPanel from '../views/AnnouncementPanel.vue';
import jobVacancyPanel from '../views/JobVacancyPanel.vue';
import adminPanel from '../views/AdminPanel.vue';
import blacklistPanel from '../views/BlacklistPanel.vue';
import uploadJobVacancy from '../views/UploadJobVacancy.vue';
import resumeJobSeeker from '../views/ResumeJobSeeker.vue';
import report from '../views/Report.vue';
import dataUMKM from '../views/DataUMKM.vue';
import detailBlacklist from '../views/DetailBlacklist.vue';
import accessBlock from '../views/403.vue';
import notFound from '../views/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: index,
  },
  {
    path: '/school',
    name: 'school',
    component: school,
  },
  {
    path: '/faq',
    name: 'faq',
    component: faq,
  },
  {
    path: '/article',
    name: 'article',
    component: article,
  },
  {
    path: '/about-us',
    name: 'aboutUs',
    component: aboutUs,
  },
  {
    path: '/school-detail/:id',
    name: 'schoolDetail',
    component: schoolDetail,
  },
  {
    path: '/job-vacancy',
    name: 'jobVacancy',
    component: jobVacancy,
  },
  {
    path: '/job-seeker/:role',
    name: 'jobSeeker',
    component: jobSeeker,
  },
  {
    path: '/job-seeker-internship/:role',
    name: 'jobSeekerInternship',
    component: jobSeekerInternship,
  },
  {
    path: '/job-seeker-informal/:role',
    name: 'jobSeekerInformal',
    component: jobSeekerInformal,
  },
  {
    path: '/job-seeker-professional/:role',
    name: 'jobSeekerProfesional',
    component: jobSeekerProfesional,
  },
  {
    path: '/article-detail/:id',
    name: 'detailArticle',
    component: detailArticle,
  },
  {
    path: '/job-seeker-detail/:id',
    name: 'detailJobSeeker',
    component: detailJobSeeker,
    // beforeEnter: (to, from, next) => {
    //   if (window.$cookies.isKey('token')) {
    //     next();
    //   } else {
    //     next('/login-company');
    //   }
    // },
  },
  {
    path: '/detail-blacklist/:jobSeeker/:company',
    name: 'detailBlacklist',
    component: detailBlacklist,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/login-company');
      }
    },
  },
  {
    path: '/activate-account',
    name: 'activateAccount',
    component: activateAccount,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/register-account/:id',
    name: 'registerAccount',
    component: registerAccount,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/upload-job-vacancy',
    name: 'uploadJobVacancy',
    component: uploadJobVacancy,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/login-company');
      }
    },
  },
  {
    path: '/detail-job-vacancy/:id',
    name: 'detailJobVacancy',
    component: detailJobVacancy,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/login-job-seeker');
      }
    },
  },
  {
    path: '/login-job-seeker',
    name: 'loginJobSeeker',
    component: loginJobSeeker,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/login-company',
    name: 'loginCompany',
    component: loginCompany,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/login-admin',
    name: 'loginAdmin',
    component: loginAdmin,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/home',
    name: 'dashboard',
    component: dashboard,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/faq-panel',
    name: 'faqPanel',
    component: faqPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: contact,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/change-password',
    name: 'changePassword',
    component: changePassword,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/about-us-panel',
    name: 'aboutUsPanel',
    component: aboutUsPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/article-panel',
    name: 'articlePanel',
    component: articlePanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/school-panel',
    name: 'schoolPanel',
    component: schoolPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/job-seeker-panel',
    name: 'jobSeekerPanel',
    component: jobSeekerPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/UMKM-panel',
    name: 'UMKMPanel',
    component: UMKMPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/mitra-panel',
    name: 'mitraPanel',
    component: mitraPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/announcement-panel',
    name: 'announcementPanel',
    component: announcementPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/job-vacancy-panel',
    name: 'jobVacancyPanel',
    component: jobVacancyPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/admin-panel',
    name: 'adminPanel',
    component: adminPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/blacklist-panel',
    name: 'blacklistPanel',
    component: blacklistPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/professional-panel',
    name: 'professionalPanel',
    component: professionalPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/internship-panel',
    name: 'internshipPanel',
    component: internshipPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/informal-panel',
    name: 'informalPanel',
    component: informalPanel,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/report',
    name: 'report',
    component: report,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/resume-job-seeker',
    name: 'resumeJobSeeker',
    component: resumeJobSeeker,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/data-umkm',
    name: 'dataUMKM',
    component: dataUMKM,
    beforeEnter: (to, from, next) => {
      if (window.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/access-block',
    name: 'accessBlock',
    component: accessBlock,
  },
  {
    path: '/*',
    name: 'notFound',
    component: notFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
