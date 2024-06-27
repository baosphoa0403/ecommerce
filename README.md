## Migrations
---
### Step 1: Install typeorm cli <br />
##### example: npm i -g typeorm <br />
### Step 2: Copy Path Project Go To Folder Migrations <br />
##### example: typeorm migration:create apps/product-catalog-service/src/app/Product-Catalog/infrastructure/database/migrations/PostRefactoring <br />
### Step 3: After Import File Migrations in File index.ts <br />
--- 
## Revert Migration
### typeorm -d ecommerce/apps/product-catalog-service/src/app/Product-Catalog/infrastructure/database/database.ts migration:revert

