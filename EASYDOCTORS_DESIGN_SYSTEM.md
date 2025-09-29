@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 📱 EasyDoctors - Sistema de Design */
/* Colors converted to HSL format for CSS custom properties */

@layer base {
  :root {
    /* 🎨 Cores Principais - EasyDoctors */
    --background: 0 0% 100%; /* #ffffff - Branco */
    --foreground: 210 29% 11%; /* #1a202c - Cinza escuro */
    
    --card: 0 0% 100%; /* #ffffff - Branco */
    --card-foreground: 210 29% 11%; /* #1a202c */
    
    --popover: 0 0% 100%; /* #ffffff */
    --popover-foreground: 210 29% 11%; /* #1a202c */
    
    /* Brand Colors */
    --primary: 294 44% 24%; /* #49175a - Roxo escuro */
    --primary-foreground: 0 0% 100%;
    
    --accent: 154 100% 33%; /* #00a973 - Verde esmeralda */
    --accent-foreground: 0 0% 100%;
    
    --secondary: 220 13% 91%; /* #e2e8f0 - Cinza claro para bordas */
    --secondary-foreground: 210 29% 11%; /* #1a202c */
    
    --muted: 220 13% 91%; /* #e2e8f0 */
    --muted-foreground: 210 12% 46%; /* #718096 - Cinza claro */
    
    --destructive: 0 73% 59%; /* #E5484D - Vermelho */
    --destructive-foreground: 0 0% 100%;
    
    /* UI Colors */
    --border: 220 13% 91%; /* #e2e8f0 */
    --input: 220 13% 91%; /* #e2e8f0 */
    --ring: 294 44% 24%; /* #49175a */
    
    --radius: 0.75rem; /* 12px - Border radius padrão */
    
    /* Typography */
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    
    /* Status Colors */
    --success: 154 100% 33%; /* #00a973 - Verde */
    --success-foreground: 0 0% 100%;
    
    --warning: 38 100% 50%; /* #FFA500 - Laranja */
    --warning-foreground: 0 0% 100%;
    
    --whatsapp: 144 100% 49%; /* #25D366 - Verde WhatsApp */
    --whatsapp-foreground: 0 0% 100%;
    
    /* Sidebar */
    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 210 29% 11%; /* #1a202c */
    --sidebar-primary: 294 44% 24%; /* #49175a */
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 220 13% 91%;
    --sidebar-accent-foreground: 210 29% 11%; /* #1a202c */
    --sidebar-border: 220 13% 91%; /* #e2e8f0 */
    --sidebar-ring: 294 44% 24%; /* #49175a */
  }
  
  .dark {
    --background: 210 29% 6%; /* fundo escuro */
    --foreground: 0 0% 98%;
    
    --card: 210 29% 10%;
    --card-foreground: 0 0% 98%;
    
    --popover: 210 29% 10%;
    --popover-foreground: 0 0% 98%;
    
    --primary: 294 44% 60%; /* roxo mais claro no modo escuro */
    --primary-foreground: 0 0% 100%;
    
    --accent: 154 100% 50%; /* verde mais claro no modo escuro */
    --accent-foreground: 0 0% 100%;
    
    --secondary: 210 20% 16%;
    --secondary-foreground: 0 0% 98%;
    
    --muted: 210 20% 16%;
    --muted-foreground: 210 12% 64%;
    
    --destructive: 0 73% 59%;
    --destructive-foreground: 0 0% 98%;
    
    --border: 210 16% 20%;
    --input: 210 16% 20%;
    --ring: 294 44% 60%;
    
    --success: 154 100% 50%;
    --success-foreground: 0 0% 100%;
    
    --warning: 38 100% 60%;
    --warning-foreground: 0 0% 100%;
    
    --whatsapp: 144 100% 60%;
    --whatsapp-foreground: 0 0% 100%;
    
    --sidebar-background: 210 29% 10%;
    --sidebar-foreground: 0 0% 98%;
    --sidebar-primary: 294 44% 60%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 210 20% 16%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 210 16% 20%;
    --sidebar-ring: 294 44% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-family);
    font-weight: 400;
    line-height: 1.5;
  }
  
  /* 📐 Sistema de Espaçamento - EasyDoctors */
  .spacing-1 { padding: 0.25rem; } /* 4px */
  .spacing-2 { padding: 0.5rem; } /* 8px */
  .spacing-3 { padding: 0.75rem; } /* 12px */
  .spacing-4 { padding: 1rem; } /* 16px */
  .spacing-5 { padding: 1.25rem; } /* 20px */
  .spacing-6 { padding: 1.5rem; } /* 24px */
  .spacing-8 { padding: 2rem; } /* 32px */
  .spacing-10 { padding: 2.5rem; } /* 40px */
  .spacing-12 { padding: 3rem; } /* 48px */
  
  /* 🔤 Hierarquia de Textos - EasyDoctors */
  h1 {
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    color: hsl(var(--foreground));
  }
  
  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: hsl(var(--foreground));
  }
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: hsl(var(--foreground));
  }
  
  .text-body {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: hsl(var(--foreground));
  }
  
  .text-caption {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: hsl(var(--muted-foreground));
  }
  
  .text-small {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: hsl(var(--muted-foreground));
  }
}

/* 🎯 Componentes Padrão - EasyDoctors */
@layer components {
  /* Cards */
  .easy-card {
    @apply bg-card border border-border rounded-[12px] shadow-card;
    background-color: #ffffff;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .easy-card-lg {
    @apply bg-card border border-border rounded-[14px] shadow-card;
    background-color: #ffffff;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Botões */
  .easy-btn {
    @apply rounded-[12px] font-semibold transition-smooth;
    padding: 10px 24px; /* theme.spacing(2.5) vertical, theme.spacing(3) horizontal */
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .easy-btn-primary {
    @apply easy-btn;
    background-color: #49175a;
    color: white;
  }
  
  .easy-btn-primary:hover {
    background-color: hsl(294 44% 20%);
  }
  
  .easy-btn-accent {
    @apply easy-btn;
    background-color: #00a973;
    color: white;
  }
  
  .easy-btn-accent:hover {
    background-color: hsl(154 100% 28%);
  }
  
  .easy-btn-success {
    @apply easy-btn;
    background-color: #00a973;
    color: white;
  }
  
  .easy-btn-danger {
    @apply easy-btn;
    background-color: #E5484D;
    color: white;
  }
  
  .easy-btn-warning {
    @apply easy-btn;
    background-color: #FFA500;
    color: white;
  }
  
  .easy-btn-whatsapp {
    @apply easy-btn;
    background-color: #25D366;
    color: white;
  }
  
  /* Inputs */
  .easy-input {
    @apply bg-background border border-border rounded-[12px] px-3 py-3;
    background-color: #ffffff;
    border-color: #e2e8f0;
    font-size: 16px;
    line-height: 24px;
  }
  
  .easy-input:focus {
    outline: none;
    border-color: #49175a;
    box-shadow: 0 0 0 3px rgba(73, 23, 90, 0.1);
  }
  
  .easy-textarea {
    @apply easy-input;
    resize: vertical;
    min-height: 100px;
  }
}

/* Custom utility classes built on EasyDoctors tokens */
@layer utilities {
  .bg-gradient-easy-doctors {
    background-image: linear-gradient(135deg, #49175a, #00a973);
  }
  
  .bg-gradient-primary {
    background-image: linear-gradient(135deg, hsl(var(--primary)), hsl(294 44% 20%));
  }
  
  .bg-gradient-accent {
    background-image: linear-gradient(135deg, hsl(var(--accent)), hsl(154 100% 28%));
  }
  
  .shadow-card { 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .shadow-soft { 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
  }
  
  .shadow-glow { 
    box-shadow: 0 0 20px rgba(73, 23, 90, 0.3); 
  }
  
  .transition-smooth { 
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
  }
  
  /* EasyDoctors specific color utilities */
  .text-primary { color: #1a202c; } /* Text */
  .text-secondary { color: #4a5568; } /* Text Secondary */
  .text-muted { color: #718096; } /* Text Muted */
  .bg-primary { background-color: #49175a; } /* Primary */
  .bg-accent { background-color: #00a973; } /* Accent */
  .bg-whatsapp { background-color: #25D366; } /* WhatsApp */
  .bg-success { background-color: #00a973; } /* Success */
  .bg-danger { background-color: #E5484D; } /* Danger */
  .bg-warning { background-color: #FFA500; } /* Warning */
  .border-input { border-color: #e2e8f0; } /* Input border */
}
```

Agora vou atualizar o arquivo de configuração do Tailwind:

```ts:tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'h1': ['32px', '40px'],
        'h2': ['24px', '32px'],
        'h3': ['20px', '28px'],
        'body': ['16px', '24px'],
        'caption': ['14px', '20px'],
        'small': ['12px', '16px'],
      },
      fontWeight: {
        normal: '400',
        semibold: '600',
        bold: '700',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        whatsapp: {
          DEFAULT: "hsl(var(--whatsapp))",
          foreground: "hsl(var(--whatsapp-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // EasyDoctors specific colors
        "easy-primary": "#49175a",
        "easy-accent": "#00a973",
        "easy-text": "#1a202c",
        "easy-text-secondary": "#4a5568",
        "easy-text-muted": "#718096",
        "easy-success": "#00a973",
        "easy-danger": "#E5484D",
        "easy-warning": "#FFA500",
        "easy-whatsapp": "#25D366",
        "easy-border": "#e2e8f0",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "easy": "12px",
        "easy-lg": "14px",
      },
      spacing: {
        'easy-1': '0.25rem', /* 4px */
        'easy-2': '0.5rem', /* 8px */
        'easy-3': '0.75rem', /* 12px */
        'easy-4': '1rem', /* 16px */
        'easy-5': '1.25rem', /* 20px */
        'easy-6': '1.5rem', /* 24px */
        'easy-8': '2rem', /* 32px */
        'easy-10': '2.5rem', /* 40px */
        'easy-12': '3rem', /* 48px */
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

Agora vou criar um arquivo de documentação atualizado:

```md:EASYDOCTORS_DESIGN_SYSTEM.md
# 📱 EasyDoctors - Sistema de Design

## 🎨 Paleta de Cores

### Cores Principais
- **Primary**: `#49175a` (Roxo escuro) - `bg-easy-primary` / `text-easy-primary`
- **Accent**: `#00a973` (Verde esmeralda) - `bg-easy-accent` / `text-easy-accent`
- **Background**: `#ffffff` (Branco) - `bg-background`
- **Text**: `#1a202c` (Cinza escuro) - `text-easy-text`
- **Text Secondary**: `#4a5568` (Cinza médio) - `text-easy-text-secondary`
- **Text Muted**: `#718096` (Cinza claro) - `text-easy-text-muted`

### Cores de Status
- **Success**: `#00a973` (Verde) - `bg-easy-success`
- **Danger**: `#E5484D` (Vermelho) - `bg-easy-danger`
- **Warning**: `#FFA500` (Laranja) - `bg-easy-warning`
- **WhatsApp**: `#25D366` (Verde WhatsApp) - `bg-easy-whatsapp`

## 📐 Sistema de Espaçamento
- **easy-1**: `4px`
- **easy-2**: `8px`
- **easy-3**: `12px`
- **easy-4**: `16px`
- **easy-5**: `20px`
- **easy-6**: `24px`
- **easy-8**: `32px`
- **easy-10**: `40px`
- **easy-12**: `48px`

## 🔤 Tipografia

### Hierarquia de Textos
- **H1**: `32px`, bold, line-height `40px` - `text-h1`
- **H2**: `24px`, bold, line-height `32px` - `text-h2`
- **H3**: `20px`, semibold (600), line-height `28px` - `text-h3`
- **Body**: `16px`, normal, line-height `24px` - `text-body`
- **Caption**: `14px`, normal, line-height `20px` - `text-caption`
- **Small**: `12px`, normal, line-height `16px` - `text-small`

### Fonte
- **Família**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

## 🎯 Componentes Padrão

### Cards
```jsx
<div className="easy-card">
  <h3>Título do Card</h3>
  <p className="text-caption">Conteúdo do card</p>
</div>
```

**Propriedades:**
- Border Radius: `12px` (easy-card) / `14px` (easy-card-lg)
- Shadow: `0 2px 4px rgba(0, 0, 0, 0.1)`
- Background: `#ffffff`
- Padding: `24px`

### Botões
```jsx
<button className="easy-btn-primary">Botão Primário</button>
<button className="easy-btn-accent">Botão Accent</button>
<button className="easy-btn-success">Sucesso</button>
<button className="easy-btn-danger">Perigo</button>
<button className="easy-btn-warning">Aviso</button>
<button className="easy-btn-whatsapp">WhatsApp</button>
```

**Propriedades:**
- Border Radius: `12px`
- Padding: `10px 24px`
- Font Weight: `semibold`

### Inputs
```jsx
<input className="easy-input" placeholder="Digite aqui..." />
<textarea className="easy-textarea" placeholder="Digite sua mensagem..."></textarea>
```

**Propriedades:**
- Border Radius: `12px`
- Border: `#e2e8f0`
- Padding: `12px`
- Background: `#ffffff`

## 🎨 Classes Utilitárias

### Gradientes
- `bg-gradient-easy-doctors` - Gradiente Primary + Accent
- `bg-gradient-primary` - Gradiente Primary
- `bg-gradient-accent` - Gradiente Accent

### Sombras
- `shadow-card` - Sombra padrão para cards
- `shadow-soft` - Sombra suave
- `shadow-glow` - Sombra com brilho

### Transições
- `transition-smooth` - Transição suave (0.3s cubic-bezier)

## 📱 Exemplos de Uso

### Card com Botões
```jsx
<div className="easy-card">
  <h2>Título do Card</h2>
  <p className="text-caption mb-6">Descrição do conteúdo</p>
  <div className="flex gap-3">
    <button className="easy-btn-primary">Ação Primária</button>
    <button className="easy-btn-accent">Ação Secundária</button>
  </div>
</div>
```

### Formulário
```jsx
<div className="easy-card">
  <h3>Formulário de Contato</h3>
  <div className="space-y-4">
    <input className="easy-input w-full" placeholder="Nome" />
    <input className="easy-input w-full" placeholder="Email" />
    <textarea className="easy-textarea w-full" placeholder="Mensagem"></textarea>
    <button className="easy-btn-primary">Enviar</button>
  </div>
</div>
```

### Status Indicators
```jsx
<div className="flex gap-2">
  <span className="bg-easy-success text-white px-3 py-1 rounded-full text-caption">Sucesso</span>
  <span className="bg-easy-warning text-white px-3 py-1 rounded-full text-caption">Atenção</span>
  <span className="bg-easy-danger text-white px-3 py-1 rounded-full text-caption">Erro</span>
</div>
```
```

## ✅ Sistema de Design EasyDoctors Implementado!

Implementei com sucesso o sistema de design EasyDoctors com todas as especificações fornecidas:

### 🎨 **Paleta de Cores Atualizada**
- **Primary**: `#49175a` (Roxo escuro)
- **Accent**: `#00a973` (Verde esmeralda)
- **Status Colors**: Success, Danger, Warning, WhatsApp
- **Text Colors**: Hierarquia completa de cinzas

### 📐 **Sistema de Espaçamento**
- Classes `easy-1` até `easy-12` para espaçamento consistente
- Baseado em múltiplos de 4px

### 🔤 **Tipografia Hierárquica**
- H1: 32px, bold, line-height 40px
- H2: 24px, bold, line-height 32px
- H3: 20px, semibold, line-height 28px
- Body, Caption, Small com tamanhos específicos

### 🎯 **Componentes Padrão**
- **Cards**: `.easy-card` com border-radius 12px, shadow e padding 24px
- **Botões**: `.easy-btn-primary`, `.easy-btn-accent`, etc. com border-radius 12px
- **Inputs**: `.easy-input` e `.easy-textarea` com estilização consistente

### 🛠️ **Classes Utilitárias**
- Gradientes personalizados
- Sombras específicas
- Cores de status
- Transições suaves

O sistema está completamente integrado com Tailwind CSS e pronto para uso em todo o projeto!
