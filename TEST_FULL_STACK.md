# ✅ Full Stack Integration Test Guide

This document provides a step-by-step checklist to verify that the entire application is properly wired and working end-to-end.

## Pre-Test Setup

### 1. Start Backend Server
```powershell
# Open Terminal 1
.\start-backend.ps1
```

Wait for:
```
✅ Starting Uvicorn server...
📡 Backend will be available at: http://127.0.0.1:8000
```

### 2. Start Frontend Server
```powershell
# Open Terminal 2  
.\start-frontend.ps1
```

Wait for:
```
Local: http://localhost:5173/
```

---

## Test Checklist

### Phase 1: Backend API Tests (via Swagger UI)

1. **Open API Docs:** http://127.0.0.1:8000/docs

2. **Test Health Check**
   - [ ] GET `/api/health` returns `{"status": "ok"}`

3. **Test User Registration**
   - [ ] POST `/api/auth/register` with test email/password
   - [ ] Returns 201 with user object (id, email, role)
   - [ ] Try same email again - should get 409 Conflict

4. **Test Login**
   - [ ] POST `/api/auth/login` with registered credentials
   - [ ] Returns 200 with access_token
   - [ ] Copy the access_token for next steps

5. **Test Protected Endpoints**
   - [ ] Click "Authorize" button at top right
   - [ ] Paste token in format: `Bearer YOUR_TOKEN_HERE`
   - [ ] GET `/api/vehicles` - should return list of seeded vehicles
   - [ ] Try without auth - should get 401

---

### Phase 2: Frontend UI Tests

#### A. Authentication Flow

1. **Open Frontend:** http://localhost:5173

2. **Test Registration Page**
   - [ ] Click "Register here" link
   - [ ] Fill in email and password
   - [ ] Try mismatched passwords - see error
   - [ ] Try short password (<6 chars) - see error
   - [ ] Complete registration successfully
   - [ ] Redirected to login page

3. **Test Login Page**
   - [ ] Enter registered credentials
   - [ ] Click "Sign In"
   - [ ] Successfully redirects to dashboard

4. **Test Invalid Login**
   - [ ] Logout (click "Sign Out" button)
   - [ ] Try wrong password - see error toast
   - [ ] Try non-existent email - see error toast

#### B. Regular User Features

1. **Login as Regular User**
   ```
   Email: user@example.com
   Password: user123
   ```

2. **Test Dashboard View**
   - [ ] See navbar with "Car Dealership" branding
   - [ ] See user email displayed
   - [ ] NO "Admin" badge shown
   - [ ] NO "Add Vehicle" button visible
   - [ ] Grid of vehicles displayed
   - [ ] Each card shows: make, model, category, price, quantity

3. **Test Search/Filter**
   - [ ] Enter "Toyota" in Make field, click Search
   - [ ] Only Toyota vehicles shown
   - [ ] Try price range filter (min: 20000, max: 30000)
   - [ ] Only vehicles in range shown
   - [ ] Click "Reset" button
   - [ ] All vehicles shown again

4. **Test Vehicle Purchase**
   - [ ] Find a vehicle with quantity > 0
   - [ ] Click "Purchase" button
   - [ ] See success toast notification
   - [ ] Quantity decreases by 1
   - [ ] Find Mazda CX-5 (0 quantity)
   - [ ] "Purchase" button is disabled
   - [ ] See "Out of Stock" badge

5. **Test User Restrictions**
   - [ ] Right-click inspect any vehicle card
   - [ ] Confirm NO Edit/Delete/Restock buttons present

#### C. Admin User Features

1. **Logout and Login as Admin**
   ```
   Email: admin@example.com
   Password: admin123
   ```

2. **Test Admin View**
   - [ ] See "Admin" badge next to email in navbar
   - [ ] See "Add Vehicle" button at top
   - [ ] Each vehicle card has Edit/Restock/Delete buttons
   - [ ] NO "Purchase" button shown

3. **Test Add Vehicle**
   - [ ] Click "+ Add Vehicle" button
   - [ ] Modal opens with form
   - [ ] Fill in all fields:
     - Make: Audi
     - Model: A4
     - Category: Sedan
     - Price: 45000
     - Quantity: 3
   - [ ] Click "Save Vehicle"
   - [ ] See success toast
   - [ ] New vehicle appears in grid

4. **Test Edit Vehicle**
   - [ ] Click "Edit" on any vehicle
   - [ ] Modal opens with pre-filled data
   - [ ] Change price to 46000
   - [ ] Click "Save Vehicle"
   - [ ] See success toast
   - [ ] Price updated in grid

5. **Test Restock Vehicle**
   - [ ] Find vehicle with low quantity
   - [ ] Click "Restock" button
   - [ ] Enter quantity: 10
   - [ ] Click OK
   - [ ] See success toast
   - [ ] Quantity increased

6. **Test Delete Vehicle**
   - [ ] Click "Delete" on a vehicle
   - [ ] See confirmation dialog
   - [ ] Click OK
   - [ ] See success toast
   - [ ] Vehicle removed from grid

#### D. Responsive Design

1. **Desktop View (already tested above)**
   - [ ] Layout looks good on full screen

2. **Mobile View**
   - [ ] Open browser DevTools (F12)
   - [ ] Toggle device toolbar (Ctrl+Shift+M)
   - [ ] Select iPhone or Android device
   - [ ] Navbar adapts to mobile
   - [ ] Vehicle cards stack vertically
   - [ ] Filter form stacks vertically
   - [ ] Buttons are full-width
   - [ ] Modal fits on screen

#### E. Session Persistence

1. **Test Token Storage**
   - [ ] Login as any user
   - [ ] Close browser tab
   - [ ] Reopen http://localhost:5173
   - [ ] Still logged in (token persisted)

2. **Test Logout**
   - [ ] Click "Sign Out" button
   - [ ] Redirected to login page
   - [ ] Refresh page
   - [ ] Still on login page (token cleared)

---

### Phase 3: Integration Tests

#### A. Cross-Origin Requests (CORS)

1. **Verify CORS Headers**
   - [ ] Open DevTools Network tab
   - [ ] Perform any API action (login, search, etc.)
   - [ ] Check Response Headers
   - [ ] Confirm `access-control-allow-origin: http://localhost:5173`
   - [ ] NO CORS errors in console

#### B. Real-Time Data Sync

1. **Test Multi-User Scenario**
   - [ ] Open two browser windows side-by-side
   - [ ] Login as admin in Window 1
   - [ ] Login as user in Window 2
   - [ ] Admin adds a vehicle in Window 1
   - [ ] User refreshes Window 2
   - [ ] New vehicle appears

2. **Test Stock Updates**
   - [ ] Admin Window: Note a vehicle's quantity
   - [ ] User Window: Purchase that vehicle
   - [ ] Admin Window: Refresh page
   - [ ] Quantity decreased correctly

#### C. Error Handling

1. **Test Network Failure**
   - [ ] Stop backend server (Ctrl+C in Terminal 1)
   - [ ] Try to login in frontend
   - [ ] See error toast with message
   - [ ] Restart backend
   - [ ] Login works again

2. **Test Invalid Token**
   - [ ] Open DevTools > Application > Local Storage
   - [ ] Edit `access_token` value (change a character)
   - [ ] Try to access dashboard
   - [ ] Get redirected to login (401 error)

---

### Phase 4: Backend Test Suite

```powershell
# In Terminal 3 (separate from servers)
cd Backend
python -m venv venv  # if not already created
.\venv\Scripts\Activate.ps1
$env:JWT_SECRET = "test-secret"
python -m pytest tests/ -v
```

Expected Results:
- [ ] All 31 tests pass
- [ ] No failures or errors
- [ ] Coverage report shows high coverage

---

## Success Criteria

✅ **Backend is properly wired if:**
- Health check works
- All API endpoints respond correctly
- JWT authentication enforces access control
- CORS allows frontend requests
- Database operations persist
- All 31 tests pass

✅ **Frontend is properly wired if:**
- Login/register flows work
- Protected routes require authentication
- API calls succeed with proper headers
- Role-based UI elements show/hide correctly
- Search and filters work
- Toast notifications appear
- Responsive design works on mobile

✅ **Integration is properly wired if:**
- Frontend can communicate with backend
- CORS is configured correctly
- JWT tokens are properly managed
- Real-time data updates work
- Error handling is graceful
- Session persistence works

---

## Troubleshooting

### Issue: "Failed to fetch" errors

**Solution:**
1. Verify backend is running on port 8000
2. Check CORS middleware is enabled in backend
3. Verify frontend API_URL is correct (127.0.0.1:8000)

### Issue: "401 Unauthorized" on protected routes

**Solution:**
1. Verify JWT_SECRET is set in backend
2. Check token is stored in localStorage
3. Verify Authorization header is sent with requests
4. Check token hasn't expired (30 min default)

### Issue: Admin features not showing

**Solution:**
1. Verify user role is "admin" in database
2. Check JWT token contains role claim
3. Logout and login again to refresh token

---

## Next Steps After Testing

1. ✅ Review code for understanding
2. ✅ Read commit history to see TDD flow
3. ✅ Experiment with breaking things and fixing them
4. ✅ Add your own features
5. ✅ Deploy to production (Vercel + Railway/Render)

---

**Happy Testing! 🚀**

If all checks pass, the application is fully wired and production-ready!
