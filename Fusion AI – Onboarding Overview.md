# **Fusion AI – Onboarding Overview**

*Fusion AI is a unified AI orchestration platform that routes user queries to the most suitable AI provider — including OpenAI, Claude, and Gemini — through a central smart engine called NeuroSwitch. It consolidates multiple AI services into a single user interface and API, optimizing cost, performance, and convenience.*

---

## **🔧 Project Structure**

### **🖥️ Frontend (Next.js 14 \+ React 18 \+ Tailwind \+ TypeScript)**

* **Chat Interface**

  * Supports multi-model chat (OpenAI, Gemini, Claude, and NeuroSwitch).

  * Users can edit chat titles and delete chats.

  * Messages persist in DB per session.

* **Dashboard Modules**

  * **Credits**: Shows balance, recent transactions, and auto top-up.

  * **Settings**: Set default provider, allow/ignore filters, notification prefs.

  * **API Keys**: Generate, deactivate, delete keys.

  * **Activity Logs**: View per-model usage: tokens, cost, latency.

  * **Model Explorer**: Browse all available models (table view, filters).

  * **Rankings**: Charts and stats for benchmark comparison (MMLU, GPQA, etc.).

* **State Handling**

  * Model selection is UI-ephemeral, not saved in chat records.

  * Token usage bar updates after each response.

---

### **🔙 Backend (Node.js \+ Express \+ PostgreSQL)**

* **Routes**

  * `/auth` – login/register (OAuth \+ email)

  * `/chat` – send message (logs usage, hits NeuroSwitch)

  * `/chats` – CRUD for chat sessions

  * `/messages` – tied to chat sessions

  * `/api-keys` – manage per-user keys

  * `/credits` – handle Stripe, deduct usage

  * `/usage` – query usage logs

* **Behavior**

  * Verifies API key or JWT

  * Logs token usage (input/output), latency, cost

  * Creates default settings \+ API key on first login

---

### **🧠 NeuroSwitch (Flask \+ Python)**

* **Job**: Decide which model (Claude/Gemini/OpenAI) handles a message

* **Smart Routing**

  * Uses BART classifier for zero-shot provider selection

  * Supports fallback if preferred provider fails

* **Extras**

  * Logs model decisions, tokens, latency, fallback reason

  * Handles message history and sanitized context

---

## **🗃️ Database Schema**

PostgreSQL schema includes:

* `users`: email, role, profile, timestamps

* `api_keys`: linked to users, unique, toggleable

* `chats` / `messages`: tied to user, sessioned

* `usage_logs`: tokens, cost, model, latency, fallback reason

* `user_settings`: preferences like theme, model order, provider filters

* `payments`: supports Stripe, credits, status

* `model_preferences`: default model, allow/ignore list

* `organizations`: multi-user accounts (scaffolded)

---

## **🔁 Workflow**

* User Registers or Logs In  
   → JWT session created, default preferences and API key assigned.  
* Chat Session Begins  
  → User selects a model (or NeuroSwitch); enters a prompt.  
* Backend Validates \+ Logs  
  → Fusion API verifies JWT/API key, logs metadata, and sends query to NeuroSwitch.  
* NeuroSwitch Routes Query  
  → Use zero-shot classification to choose the best model.  
  → If the provider fails, gracefully falls back to an alternate.  
* Response Delivered  
  → Results returned to UI, tokens counted, cost calculated.  
  → Usage and response time are logged to the database.  
* Billing and Analytics  
  → Usage logs and cost history are shown in the dashboard.


---

## **✅ Features Completed**

* Full auth (JWT \+ OAuth)

* Chat system with provider switcher

* Token/cost/latency usage logs

* Model comparison, search, filtering

* Dashboard for credits, API keys, activity

* Credit deduction \+ recent transactions

* NeuroSwitch AI routing with fallback

* DB schema, indexes, and token accounting

---

#### 

#### 

#### **NeuroSwitch Engine (Python \+ Flask)**

* **Core Role**: The brain of Fusion — NeuroSwitch determines the best AI model for a user’s query using smart logic and classification.

* **Zero-Shot Classification**:

  * Uses a **local BART model** to analyze incoming prompts.

  * Automatically routes the request to the best provider based on intent, context, or fallback logic.

* **Features**:

  * Cross-provider conversation memory.

  * Token and performance logging.

  * Response fallback handling.

  * Context sanitization (to fit within model limits).

## **🧠 What a New Dev Should Know**

* Models are selected on the UI, passed in each message — not saved to DB unless desired.

* NeuroSwitch routes to the provider and logs the decision.

* Backend logs every detail (tokens, response time, fallback reason).

* You can add providers or fallback logic in NeuroSwitch easily.

* Stripe handles top-up, transactions are logged for every use.

* The frontend is modular. State flows through props and context.

**Payment Integration**:

* **Stripe** for credit card payments.

* **BTCPay Server** for **Bitcoin** and **Bitcoin Lightning** payments (fully self-hosted, equivalent in functionality to Stripe).

**Auto Top-Up Support**: (Stripe only) Trigger top-up based on low balance.

##### **Built-In Tools (Available in NeuroSwitch):**

These tools can be used by the engine to perform external tasks, automations, and dynamic behaviors:

* `filecreatortool.py` – Create new files.

* `fileedittool.py` – Edit existing files.

* `filecontentreadertool.py` – Read file contents.

* `createfolderstool.py` – Create folders/directories.

* `diffeditortool.py` – Show or modify file diffs.

* `duckduckgotool.py` – Search web via DuckDuckGo.

* `webscrapertool.py` – Scrape data from web pages.

* `browsertool.py` – Control a browser for automation or scraping.

* `screenshottool.py` – Capture screenshots.

* `lintingtool.py` – Analyze and fix code quality issues.

* `e2bcodetool.py` – Perform code-based tasks (conversion, execution, etc.).

* `uvpackagemanager.py` – Install/uninstall Python packages.

* `toolcreator.py` – Generate new tools dynamically.

* `base.py` – Base class for all tools.

