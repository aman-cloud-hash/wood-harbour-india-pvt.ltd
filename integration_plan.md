# Image Conversion System Integration Plan

We have integrated your custom image-to-URL conversion system into the Woodharbour Admin Panel.

## 🛠️ Changes Made

### 1. Frontend Service Update
Modified [supabaseService.js](file:///c:/Users/amanr_p0puhwg/Downloads/wood%20harbour%20india%20pvt.ltd/src/services/supabaseService.js) to redirect image uploads.
- **Before**: Uploaded directly to Supabase Storage.
- **After**: Sends the image to your local server at `http://localhost:3000/upload`, receives the Cloudinary URL, and uses it for the product.

## 🚀 How to Run

To make the system work, you need to have your conversion server running:

1. **Open a new terminal** and navigate to your conversion system:
   ```bash
   cd "C:\Users\amanr_p0puhwg\Downloads\wood harbour india pvt.ltd\convert\jpg-to-url"
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   *Make sure your `.env` file with Cloudinary/CockroachDB credentials is present in that folder.*

4. **In another terminal**, start your main website:
   ```bash
   cd "C:\Users\amanr_p0puhwg\Downloads\wood harbour india pvt.ltd"
   npm run dev
   ```

## 🔄 Data Flow
1. **Admin Panel**: You select an image and click "Add Product".
2. **Conversion System**: The image is sent to `localhost:3000`.
3. **Cloudinary**: Your system uploads it and gets a premium URL.
4. **CockroachDB**: Your system saves a record of the upload.
5. **Website**: The Cloudinary URL is saved in Supabase and instantly shown on your website.

> [!NOTE]
> Ensure that your local server at port 3000 is running whenever you want to upload new products from the admin panel.
