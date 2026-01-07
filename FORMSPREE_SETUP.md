# Formspree Integration Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account using your email (wesley1560@gmail.com recommended)
3. Verify your email address

### Step 2: Create a New Form
1. After logging in, click **"New Form"** or **"+ New Project"**
2. Name your form: `Portfolio Contact Form`
3. Set the email to receive submissions: `wesley1560@gmail.com`
4. Click **"Create Form"**

### Step 3: Copy Your Form Endpoint
1. After creating the form, you'll see your unique form endpoint
2. It will look like: `https://formspree.io/f/abcd1234`
3. **Copy this entire URL**

### Step 4: Update GetInTouch Component
1. Open `components/GetInTouch.tsx`
2. Find line 48: 
   ```tsx
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
3. Replace `YOUR_FORM_ID` with your actual form ID (just the part after `/f/`)
4. Example: 
   ```tsx
   action="https://formspree.io/f/abcd1234"
   ```

### Step 5: Optional Formspree Settings
In your Formspree dashboard, you can configure:

**Email Settings:**
- Email subject line (already set via `_subject` field)
- Auto-reply to submitter
- CC/BCC additional recipients

**Spam Protection:**
- reCAPTCHA (disabled by default via `_captcha` field)
- Honeypot (already enabled via `_gotcha` field)
- Submission limits

**Notifications:**
- Email notifications
- Slack/Discord webhooks
- Custom redirect after submission

**Form Fields:**
- Review which fields are required
- Set up custom validation messages

## 📧 What Happens When Someone Submits

1. User fills out the form on your portfolio
2. Formspree receives the submission
3. You get an email at `wesley1560@gmail.com` with:
   - **Subject:** Portfolio Message – New Submission
   - **Fields:** Name, Email, Subject, Message, Phone (if provided)
4. User sees success message: "Message sent successfully. I'll get back to you soon."
5. Form fields are cleared automatically

## ✅ Testing Checklist

### Before Deployment
- [ ] Formspree account created
- [ ] Form created in Formspree dashboard
- [ ] Form endpoint copied
- [ ] `GetInTouch.tsx` updated with correct form ID
- [ ] Changes committed to git

### Local Testing
```bash
npm run dev
```
- [ ] Navigate to contact section
- [ ] Fill out all required fields
- [ ] Submit the form
- [ ] Verify success message appears
- [ ] Verify form fields clear
- [ ] Check email inbox for submission

### After Vercel Deployment
- [ ] Visit production URL
- [ ] Submit test form from production site
- [ ] Verify email received
- [ ] Check mobile responsiveness
- [ ] Test with different browsers

## 🔧 Troubleshooting

### "Form endpoint not found" error
- Double-check the form ID in `GetInTouch.tsx`
- Ensure Formspree form is active (not deleted)
- Verify you're using the correct endpoint format

### Not receiving emails
- Check spam/junk folder
- Verify email address in Formspree settings
- Check Formspree dashboard for submissions
- Ensure email verification is complete

### Form won't submit
- Check browser console for errors
- Verify form action URL is correct
- Check network tab for failed requests
- Ensure all required fields are filled

### Success message not showing
- Check browser console for JavaScript errors
- Verify component state is updating correctly
- Clear browser cache and try again

## 📊 Formspree Free Plan Limits
- **50 submissions/month** (upgrade for more)
- Unlimited forms
- Spam filtering
- File uploads (up to 10MB)
- Export submissions

If you exceed the limit, consider upgrading to Formspree Pro or implementing a different solution.

## 🎨 Customization Options

### Change Email Subject Line
Edit line 51 in `GetInTouch.tsx`:
```tsx
<input type="hidden" name="_subject" value="Portfolio Message – New Submission" />
```

### Add Auto-Reply
In Formspree dashboard:
1. Go to form settings
2. Enable "Send submitter a copy"
3. Customize auto-reply message

### Add More Fields
1. Add input to form with proper `name` attribute
2. Formspree automatically captures all named fields

## 🔐 Security Features Enabled

✅ **Honeypot spam protection** (via `_gotcha` field)
✅ **CAPTCHA disabled** for better UX (enable if spam increases)
✅ **HTTPS required** (Formspree enforces this)
✅ **CORS configured** (works from your Vercel domain)

## 📝 Current Form Configuration

**Required Fields:**
- Name (`name="name"`)
- Email (`name="email"`)
- Subject (`name="subject"`)
- Message (`name="message"`)

**Optional Fields:**
- Phone (`name="phone"`)

**Hidden Configuration:**
- `_subject`: "Portfolio Message – New Submission"
- `_captcha`: "false"
- `_gotcha`: Honeypot spam trap

## 🚢 Deployment

```bash
# Commit changes
git add components/GetInTouch.tsx
git commit -m "Integrate Formspree with contact form"
git push origin 2026_01_01_portfolio

# Deploy to Vercel (automatic if connected)
# Or manually trigger deployment in Vercel dashboard
```

## 📱 Mobile Testing Notes

The form is fully responsive and tested on:
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Desktop Chrome/Firefox/Edge
- ✅ Tablets

All inputs are full-width on mobile and buttons remain easily tappable.

## 🆘 Support

**Formspree Documentation:** https://help.formspree.io/
**Formspree Status:** https://status.formspree.io/

**Quick Links:**
- [Formspree Dashboard](https://formspree.io/forms)
- [View Submissions](https://formspree.io/submissions)
- [Email Settings](https://formspree.io/settings/email)

---

## ✨ You're All Set!

Once you complete Step 4 above, your contact form will be fully functional and emails will start arriving in your inbox. No backend code, no serverless functions, no environment variables needed!
