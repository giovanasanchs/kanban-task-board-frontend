<template>
    <aside class="sidebar">
      <div class="logo">
        <img src="../assets/Logo.svg">
      </div>
  
      <nav class="boards">
        <p class="boards-title">TODOS OS QUADROS</p>
        <ul class="board-list">
          <li class="board active">
            <span class="board-icon"><PhLayout :size="22" color="#fff" />Quadro Nexum</span>
          </li>
          <li class="board new-board">+ Criar Novo Quadro</li>
        </ul>
      </nav>
  
      <div class="bottom-section">
        <div class="theme-toggle">
          <span><PhSun :size="22" color="#9396A5" /></span>
          <label class="switch">
            <input type="checkbox" v-model="darkMode" />
            <span class="slider round"></span>
          </label>
          <span><PhMoon :size="22" color="#9396A5" /></span>
        </div>
  
        <button class="hide-sidebar"><PhEyeSlash :size="22" color="#9396A5" />Hide Sidebar</button>
      </div>
    </aside>
  </template>
  
  <script>
  import { PhMoon } from '@phosphor-icons/vue'
  import { PhSun } from '@phosphor-icons/vue'
  import { PhEyeSlash } from '@phosphor-icons/vue'
  import {PhLayout} from '@phosphor-icons/vue'

  export default {
    name: 'KanbanSidebar',
    components: {
        PhMoon, 
        PhSun,
        PhEyeSlash,
        PhLayout,
    },
    data() {
      return {
        darkMode: false,
      }
    },
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 260px;
    background-color: var(--color-surface-dark);
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    border-right: 1.5px solid var(--color-border);
    height: 100vh;
  }
  
  .logo {
    font-weight: bold;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .logo-icon {
    color: var(--color-primary);
    font-size: 1.5rem;
  }
  
  .boards-title {
    font-size: 0.8rem;
    color: #888;
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .board-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .board {
    padding: 0.75rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  
  .board.active {
    background-color: var(--color-primary);
    color: white;
  }

  .board-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .board.new-board {
    color: var(--color-primary);
    font-weight: 600;
    margin-top: 1rem;
  }
  
  .bottom-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-bg);
    padding: 0.5rem;
    border-radius: 6px;

    span{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-secondary);
    transition: 0.4s;
    border-radius: 34px;
  }
  .slider:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: var(--color-secondary);
  }
  input:checked + .slider:before {
    transform: translateX(16px);
  }
  
  .hide-sidebar {
    background: none;
    color: var(--color-text);
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    text-align: left;
  }
  </style>
  