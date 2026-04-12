// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class ThemeService {
//   private themeKey = 'theme';

//   constructor() {
//     const savedTheme : 'light' | 'dark' = localStorage.getItem(this.themeKey) || 'light';
//     this.setTheme(savedTheme);
//   }

//   setTheme(theme: 'light' | 'dark') {
//     document.documentElement.setAttribute('data-theme', theme);
//     localStorage.setItem(this.themeKey, theme);
//   }

//   toggleTheme() {
//     const current = localStorage.getItem(this.themeKey) || 'light';
//     const newTheme = current === 'light' ? 'dark' : 'light';
//     this.setTheme(newTheme);
//     return newTheme;
//   }

//   getTheme() :  'light' | 'dark'{
//     return localStorage.getItem(this.themeKey) || 'light';
//   }
// }
