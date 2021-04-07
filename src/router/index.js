import Vue from 'vue';
import VueRouter from 'vue-router';
// import index from '../views/Index.vue';
// import school from '../views/School.vue';
// import schoolDetail from '../views/SchoolDetail.vue';
// import detailArticle from '../views/DetailArticle.vue';
// import jobVacancy from '../views/JobVacancy.vue';
// import detailJobVacancy from '../views/DetailJobVacancy.vue';
// import jobSeeker from '../views/JobSeeker.vue';
// import jobSeekerInternship from '../views/JobSeekerInternship.vue';
// import jobSeekerInformal from '../views/JobSeekerInformal.vue';
// import jobSeekerProfesional from '../views/JobSeekerProfesional.vue';
// import detailJobSeeker from '../views/DetailJobSeeker.vue';
// import faq from '../views/FAQ.vue';
// import article from '../views/Article.vue';
// import aboutUs from '../views/AboutUs.vue';
// import activateAccount from '../views/ActivateAccount.vue';
// import registerAccount from '../views/RegisterAccount.vue';
// import loginJobSeeker from '../views/LoginJobSeeker.vue';
// import loginCompany from '../views/LoginCompany.vue';
// import loginAdmin from '../views/LoginAdmin.vue';
// import dashboard from '../views/Dashboard.vue';
// import faqPanel from '../views/FAQpanel.vue';
// import changePassword from '../views/ChangePassword.vue';
// import aboutUsPanel from '../views/AboutUsPanel.vue';
// import contact from '../views/Contact.vue';
// import articlePanel from '../views/ArticlePanel.vue';
// import schoolPanel from '../views/SchoolPanel.vue';
// import jobSeekerPanel from '../views/JobSeekerPanel.vue';
// import professionalPanel from '../views/ProfessionalPanel.vue';
// import internshipPanel from '../views/InternshipPanel.vue';
// import informalPanel from '../views/InformalPanel.vue';
// import UMKMPanel from '../views/UMKMPanel.vue';
// import mitraPanel from '../views/MitraPanel.vue';
// import announcementPanel from '../views/AnnouncementPanel.vue';
// import jobVacancyPanel from '../views/JobVacancyPanel.vue';
// import adminPanel from '../views/AdminPanel.vue';
// import blacklistPanel from '../views/BlacklistPanel.vue';
// import uploadJobVacancy from '../views/UploadJobVacancy.vue';
// import resumeJobSeeker from '../views/ResumeJobSeeker.vue';
// import report from '../views/Report.vue';
// import dataUMKM from '../views/DataUMKM.vue';
// import detailBlacklist from '../views/DetailBlacklist.vue';
// import checkBlaclist from '../views/CheckBlaclist.vue';
// import jobVacancyAfterLogin from '../views/JobVacancyAfterLogin.vue';
// import jobSeekerAfterLogin from '../views/JobSeekerAfterLogin.vue';
// import articleaAfterLogin from '../views/ArticleaAfterLogin.vue';
// import detailArticleAfterLogin from '../views/DetailArticleAfterLogin.vue';
// import jobSeekerInternshipAfterLogin from '../views/JobSeekerInternshipAfterLogin.vue';
// import applicationJob from '../views/ApplicationJob.vue';
// import detailAnnouncement from '../views/DetailAnnouncement.vue';
// import accessBlock from '../views/403.vue';
// import tagJob from '../views/TagJob.vue';
import notFound from '../views/404.vue';
import countDown from '../views/CountDown.vue';
// import maintenance from '../views/Maintenance.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: index,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/school',
  //   name: 'school',
  //   component: school,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/faq',
  //   name: 'faq',
  //   component: faq,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/article',
  //   name: 'article',
  //   component: article,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/about-us',
  //   name: 'aboutUs',
  //   component: aboutUs,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/school-detail/:id',
  //   name: 'schoolDetail',
  //   component: schoolDetail,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/job-vacancy',
  //   name: 'jobVacancy',
  //   component: jobVacancy,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/job-seeker',
  //   name: 'jobSeeker',
  //   component: jobSeeker,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/job-seeker-internship',
  //   name: 'jobSeekerInternship',
  //   component: jobSeekerInternship,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/job-seeker-informal',
  //   name: 'jobSeekerInformal',
  //   component: jobSeekerInformal,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/job-seeker-professional',
  //   name: 'Profesional',
  //   component: jobSeekerProfesional,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/article-detail/:id',
  //   name: 'Artikel',
  //   component: detailArticle,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/home');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/job-seeker-detail/:id',
  //   name: 'Detail Data Pencari Kerja',
  //   component: detailJobSeeker,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/login-company');
  //     }
  //   },
  // },
  // {
  //   path: '/detail-blacklist/:jobSeeker/:company',
  //   name: 'Detail Karyawan',
  //   component: detailBlacklist,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/login-company');
  //     }
  //   },
  // },
  // {
  //   path: '/check-blacklist',
  //   name: 'Cek Daftar Hitam',
  //   component: checkBlaclist,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/login-company');
  //     }
  //   },
  // },
  // {
  //   path: '/activate-account',
  //   name: 'activateAccount',
  //   component: activateAccount,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/register-account/:id',
  //   name: 'registerAccount',
  //   component: registerAccount,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/upload-job-vacancy',
  //   name: 'Upload Lowongan Kerja',
  //   component: uploadJobVacancy,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/login-company');
  //     }
  //   },
  // },
  // {
  //   path: '/detail-job-vacancy/:id',
  //   name: 'Detail Lowongan Kerja',
  //   component: detailJobVacancy,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/login-job-seeker');
  //     }
  //   },
  // },
  // {
  //   path: '/job-vacancy-job-seeker',
  //   name: 'Lowongan Kerja',
  //   component: jobVacancyAfterLogin,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/login-job-seeker');
  //     }
  //   },
  // },
  // {
  //   path: '/job-seeker-company',
  //   name: 'Cari Karyawan',
  //   component: jobSeekerAfterLogin,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/login-company');
  //     }
  //   },
  // },
  // {
  //   path: '/article-user',
  //   name: 'Artikel Umum',
  //   component: articleaAfterLogin,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/login-company');
  //     }
  //   },
  // },
  // {
  //   path: '/login-job-seeker',
  //   name: 'loginJobSeeker',
  //   component: loginJobSeeker,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/login-company',
  //   name: 'loginCompany',
  //   component: loginCompany,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/login-admin',
  //   name: 'loginAdmin',
  //   component: loginAdmin,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next('/');
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: '/home',
  //   name: 'Dashboard',
  //   component: dashboard,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/faq-panel',
  //   name: 'Panel FAQ',
  //   component: faqPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/contact',
  //   name: 'Kontak',
  //   component: contact,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/change-password',
  //   name: 'Ganti Kata Sandi',
  //   component: changePassword,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/about-us-panel',
  //   name: 'Panel Tentang Kami',
  //   component: aboutUsPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/article-panel',
  //   name: 'Panel Artikel',
  //   component: articlePanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/school-panel',
  //   name: 'Panel Sekolah Unggulan',
  //   component: schoolPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/job-seeker-panel',
  //   name: 'Panel Karyawan',
  //   component: jobSeekerPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/UMKM-panel',
  //   name: 'Panel Perusahaan',
  //   component: UMKMPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/mitra-panel',
  //   name: 'Panel Mitra',
  //   component: mitraPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/announcement-panel',
  //   name: 'Pengumuman Admin',
  //   component: announcementPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/job-vacancy-panel',
  //   name: 'Panel Lowongan Kerja',
  //   component: jobVacancyPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/admin-panel',
  //   name: 'Panel Admin',
  //   component: adminPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/blacklist-panel',
  //   name: 'Daftar Hitam',
  //   component: blacklistPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/professional-panel',
  //   name: 'Panel Profesional',
  //   component: professionalPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/internship-panel',
  //   name: 'Panel Magang',
  //   component: internshipPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/informal-panel',
  //   name: 'Panel Informal',
  //   component: informalPanel,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/report',
  //   name: 'Laporan',
  //   component: report,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/resume-job-seeker',
  //   name: 'Resume',
  //   component: resumeJobSeeker,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/data-umkm',
  //   name: 'Data Perusahaan',
  //   component: dataUMKM,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/detail-article-login/:id',
  //   name: 'Artikel',
  //   component: detailArticleAfterLogin,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/internship-login',
  //   name: 'Cari Magang',
  //   component: jobSeekerInternshipAfterLogin,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/detail-announcement/:id',
  //   name: 'Pengumuman',
  //   component: detailAnnouncement,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/application-job/:id',
  //   name: 'Daftar Lamaran',
  //   component: applicationJob,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/tag-job',
  //   name: 'Jenis Pekerjaan',
  //   component: tagJob,
  //   beforeEnter: (to, from, next) => {
  //     if (window.$cookies.isKey('token')) {
  //       next();
  //     } else {
  //       next('/');
  //     }
  //   },
  // },
  // {
  //   path: '/access-block',
  //   name: 'accessBlock',
  //   component: accessBlock,
  // },
  {
    path: '/',
    name: 'countDown',
    component: countDown,
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
