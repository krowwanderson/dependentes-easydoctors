# Sistema de Design - Easy Doctors

## Paleta de Cores

### Cores Primárias
- **Primária**: `#a265ef` (roxo vibrante) - `bg-easy-primary` / `text-easy-primary`
- **Primária Escura**: `#8a4fd4` - `bg-easy-primary-dark` / `text-easy-primary-dark`
- **Secundária**: `#ff6b35` (laranja para destaques) - `bg-easy-secondary` / `text-easy-secondary`

### Cores de Texto
- **Texto Escuro**: `#2c3e50` - `text-easy-dark`
- **Texto Claro**: `#7f8c8d` - `text-easy-light`

### Cores de Fundo e UI
- **Fundo**: `#f8f9fa` - `bg-easy-background`
- **Bordas**: `#e0e0e0` - `border-easy-border`

## Tipografia

### Fonte Principal
- **Família**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Tamanhos
- **xs**: `0.85em` - `text-xs`
- **sm**: `0.9em` - `text-sm`
- **base**: `1em` - `text-base`
- **lg**: `1.1em` - `text-lg`
- **xl**: `1.4em` - `text-xl`
- **2xl**: `2em` - `text-2xl`

### Pesos
- **400 (normal)**: `font-normal`
- **600 (semi-bold)**: `font-semibold`
- **700 (bold)**: `font-bold`

## Classes Utilitárias Personalizadas

### Gradientes
- `bg-gradient-primary` - Gradiente primário (roxo)
- `bg-gradient-accent` - Gradiente secundário (laranja)
- `bg-gradient-easy-doctors` - Gradiente Easy Doctors (roxo + laranja)

### Sombras
- `shadow-soft` - Sombra suave
- `shadow-card` - Sombra para cards
- `shadow-glow` - Sombra com brilho

### Transições
- `transition-smooth` - Transição suave (0.3s cubic-bezier)

## Uso

### Exemplo de Botão Primário
```jsx
<button className="bg-easy-primary hover:bg-easy-primary-dark text-white font-semibold px-4 py-2 rounded-lg transition-smooth">
  Botão Primário
</button>
```

### Exemplo de Card
```jsx
<div className="bg-card border border-easy-border shadow-card rounded-lg p-6">
  <h2 className="text-easy-dark font-bold text-xl mb-2">Título</h2>
  <p className="text-easy-light text-base">Conteúdo do card</p>
</div>
```

### Exemplo de Texto
```jsx
<h1 className="text-easy-dark font-bold text-2xl">Título Principal</h1>
<p className="text-easy-light font-normal text-base">Texto descritivo</p>
```
```

Implementei com sucesso o sistema de design Easy Doctors no seu projeto! As principais mudanças incluem:

## ✅ O que foi implementado:

### 🎨 **Paleta de Cores**
- **Primária**: `#a265ef` (roxo vibrante)
- **Primária Escura**: `#8a4fd4`
- **Secundária**: `#ff6b35` (laranja para destaques)
- **Texto Escuro**: `#2c3e50`
- **Texto Claro**: `#7f8c8d`
- **Fundo**: `#f8f9fa`
- **Bordas**: `#e0e0e0`

### 🔤 **Tipografia**
- Fonte principal: **Inter** (importada do Google Fonts)
- Tamanhos: `0.85em`, `0.9em`, `1em`, `1.1em`, `1.4em`, `2em`
- Pesos: `400` (normal), `600` (semi-bold), `700` (bold)

### 🛠️ **Classes Utilitárias**
- Cores personalizadas: `bg-easy-primary`, `text-easy-dark`, etc.
- Gradientes: `bg-gradient-easy-doctors`
- Sombras: `shadow-soft`, `shadow-card`, `shadow-glow`
- Transições: `transition-smooth`

### 📱 **Compatibilidade**
- Modo claro e escuro
- Responsivo
- Integrado com o sistema de componentes existente

O sistema está pronto para uso! Você pode agora usar classes como `bg-easy-primary`, `text-easy-dark`, `font-semibold`, etc. em seus componentes. O arquivo `DESIGN_SYSTEM.md` foi criado como referência para toda a equipe.
