with open('src/components/ChartGeneration.tsx', 'r') as f:
    content = f.read()

content = content.replace('aria-label={isSubmitting ? t.loading : t.submitBtn}', 'aria-label={isSubmitting ? t.loading : (isUpdate ? t.updateBtn : t.submitBtn)}')
content = content.replace('t.submitBtn\n                  )}', '(isUpdate ? t.updateBtn : t.submitBtn)\n                  )}')

with open('src/components/ChartGeneration.tsx', 'w') as f:
    f.write(content)
