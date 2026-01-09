# Email Template Structure Recommendations

## ✅ Recommended Structure

```
src/
└── modules/
    └── mail/
        ├── mail.module.ts
        ├── mail.service.ts
        └── dto/                      # Optional: DTOs for email data
            └── send-email.dto.ts
└── templates/
   │   ├── layouts/
   │   │   └── base.hbs          # Main layout wrapper
   │   ├── partials/
   │   │   ├── header.hbs       # Reusable header
   │   │   ├── footer.hbs       # Reusable footer
   │   │   └── button.hbs       # Reusable button component
   │   ├── auth/
   │   │   ├── otp.hbs
   │   │   └── reset-password.hbs
   │   ├── marketing/
   │   │   └── welcome.hbs
   │   └── shared/              # Optional: shared components
   │       └── button.hbs

```

## 📋 Structure Guidelines

### ✅ DO:

1. **Keep templates in the mail module** - Better encapsulation and organization
2. **Organize by category** (auth, marketing, transactional) - Easier to find and maintain
3. **Separate layouts from partials**:
   - `layouts/` - Full page wrappers (base.hbs)
   - `partials/` - Reusable components (header, footer, buttons)
4. **Use shared folder** - For truly reusable components across categories
5. **Reference templates by path**: `marketing/welcome` or `auth/otp`

### ❌ DON'T:

1. **Don't put assets in the mail module** - Use CDN URLs (you're already doing this ✅)
2. **Don't use web fonts** - Email clients have poor font support
   - ✅ Use system font stacks: `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;`
3. **Don't nest too deeply** - Keep it flat and organized
4. **Don't duplicate layouts** - One base layout, use partials for variations

## 🎯 Template Naming Conventions

- **Layouts**: `base.hbs`, `minimal.hbs` (if you need variations)
- **Partials**: `header.hbs`, `footer.hbs`, `button.hbs`
- **Templates**: Use kebab-case: `reset-password.hbs`, `welcome-email.hbs`

## 📝 Usage in MailService

```typescript
// Reference templates by their path relative to templates/
await this.mailerService.sendMail({
  template: 'marketing/welcome',  // templates/marketing/welcome.hbs
  // or
  template: 'auth/otp',            // templates/auth/otp.hbs
  context: { ... }
});
```

## 🔧 Current Setup

Your `mail.module.ts` is now configured to use:

```typescript
dir: join(__dirname, 'templates'); // Points to src/modules/mail/templates/
```

This means:

- ✅ Templates are co-located with the mail module
- ✅ Templates are included in the build (if configured)
- ✅ Easy to find and maintain

## 📦 Assets (Images, etc.)

**Current approach (CDN) is correct:**

- Store images on CDN
- Reference via `ASSETS` constants
- Don't bundle images with templates

## 🚀 Next Steps

1. ✅ Update `mail.module.ts` path (done)
2. Move `welcome.hbs` to `marketing/welcome.hbs`
3. Create `layouts/base.hbs` (move content from `partials/layout.hbs`)
4. Split `partials/layout.hbs` into `partials/header.hbs` and `partials/footer.hbs`
5. Update template references in `mail.service.ts`
