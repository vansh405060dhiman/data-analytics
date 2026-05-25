// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- View and Auth Elements ---
    const landingView = document.getElementById('landing-view');
    const authView = document.getElementById('auth-view');
    const appView = document.getElementById('app-view');
    const loadingView = document.getElementById('loading-view');
    const landingLogo = document.querySelector('.landing-navbar .logo');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const navSignupBtn = document.getElementById('nav-signup-btn');
    const heroCtaBtn = document.getElementById('hero-cta-btn');
    const logoutButton = document.getElementById('logout-button');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const tabLinks = document.querySelectorAll('.auth-tab-link');
    const authTabs = document.getElementById('auth-tabs');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');
    const showForgotPasswordLink = document.getElementById('show-forgot-password');
    const backToLoginLink = document.getElementById('back-to-login');
    const resetMessage = document.getElementById('reset-message');

    // --- App Content Elements ---
    const featuresHeading = document.getElementById('features-heading');
    const featuresBusiness = document.getElementById('features-business');
    const featuresStudent = document.getElementById('features-student');
    const profileName = document.getElementById('profile-name');
    const profileImg = document.getElementById('profile-img');
    const profileDropdownBtn = document.getElementById('profile-dropdown-btn');
    const profileMenu = document.getElementById('profile-menu');
    const headerLogoutBtn = document.getElementById('header-logout-btn');
    const myProfileLink = document.getElementById('my-profile-link');
    const profileModal = document.getElementById('profile-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const profileUpdateForm = document.getElementById('profile-update-form');
    const profileAgeInput = document.getElementById('profile-age');
    const profileOccupationInput = document.getElementById('profile-occupation');
    const profileUpdateMessage = document.getElementById('profile-update-message');
    const modalProfileImg = document.getElementById('modal-profile-img');
    const profilePictureInput = document.getElementById('profile-picture-input');

    // --- Notification Elements ---
    const notificationBell = document.getElementById('notification-bell');
    const notificationMenu = document.getElementById('notification-menu');
    const markReadBtn = document.getElementById('mark-read-btn');

    // --- Transaction Elements ---
    const addTransactionBtn = document.getElementById('add-transaction-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const transactionModal = document.getElementById('transaction-modal');
    const closeTransactionModal = document.getElementById('close-transaction-modal');
    const transactionForm = document.getElementById('transaction-form');
    const transactionsTbody = document.getElementById('transactions-tbody');
    const transactionModalTitle = document.getElementById('transaction-modal-title');
    const transactionFilter = document.getElementById('transaction-filter');
    let editingTransactionId = null;

    // --- Deletion Elements ---
    const deleteConfirmModal = document.getElementById('delete-confirm-modal');
    const closeDeleteModal = document.getElementById('close-delete-modal');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    let transactionToDelete = null;

    // --- Settings Elements ---
    const settingsLink = document.getElementById('settings-link');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsModal = document.getElementById('close-settings-modal');
    const settingsTabBtns = document.querySelectorAll('.settings-tab-btn');
    const settingsTabContents = document.querySelectorAll('.settings-tab-content');
    
    const settingName = document.getElementById('setting-name');
    const settingAge = document.getElementById('setting-age');
    const settingMobile = document.getElementById('setting-mobile');
    const settingOccupation = document.getElementById('setting-occupation');
    const settingCurrency = document.getElementById('setting-currency');
    const settingSavings = document.getElementById('setting-savings');
    const studentSavingsGroup = document.getElementById('student-savings-group');
    const settingExpenseGoal = document.getElementById('setting-expense-goal');
    const settingNotifications = document.getElementById('setting-notifications');
    const studentExpenseGoalGroup = document.getElementById('student-expense-goal-group');
    const settingsProfileImg = document.getElementById('settings-profile-img');
    const settingsPictureInput = document.getElementById('settings-picture-input');
    const settingsProfileForm = document.getElementById('settings-profile-form');
    const settingsProfileMessage = document.getElementById('settings-profile-message');

    const settingsPasswordForm = document.getElementById('settings-password-form');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const settingsPasswordMessage = document.getElementById('settings-password-message');
    const lastPasswordChange = document.getElementById('last-password-change');
    const currentDeviceInfo = document.getElementById('current-device-info');

    const themeRadios = document.querySelectorAll('input[name="theme-preference"]');
    const languageSelect = document.getElementById('language-select');
    const toastContainer = document.getElementById('toast-container');

    // --- State ---
    let dashboardChartsInitialized = false;
    let mainDashboardChart = null;
    let categoryDoughnutChart = null;
    let currentSortColumn = 'date';
    let currentSortAsc = false;
    window.showingAllTxs = false;

    // --- Translations Dictionary ---
    const translations = {
        en: {
            nav_dashboard: "Dashboard", nav_features: "Features", nav_demo: "Demo", nav_pricing: "Pricing", nav_logout: "Logout",
            menu_profile: "My Profile", menu_settings: "Settings",
            metric_revenue: "Total Revenue", metric_users: "Active Users", metric_conversion: "Conversion Rate", metric_bounce: "Bounce Rate",
            metric_balance: "Total Balance", metric_expenses: "Monthly Expenses", metric_savings: "Savings Goal", metric_progress: "Goal Progress",
            chart_revenue: "Revenue vs. Growth", chart_income_expense: "Income vs. Expenses", chart_traffic: "Expense Categories", table_title: "Recent Transactions", btn_add_trans: "Add Transaction", btn_download_pdf: "Download PDF",
            th_id: "Transaction ID", th_date: "Date", th_type: "Type", th_category: "Category", type_income: "Income", type_expense: "Expense", th_amount: "Amount", th_status: "Status",
            settings_title: "Settings", set_tab_profile: "Profile Info", set_tab_security: "Security", set_tab_theme: "Theme", set_tab_lang: "Language", expense_goal: "Monthly Expense Limit"
        },
        es: {
            nav_dashboard: "Panel", nav_features: "Funciones", nav_demo: "Demo", nav_pricing: "Precios", nav_logout: "Cerrar sesión",
            menu_profile: "Mi perfil", menu_settings: "Configuración",
            metric_revenue: "Ingresos totales", metric_users: "Usuarios activos", metric_conversion: "Tasa de conversión", metric_bounce: "Tasa de rebote",
            metric_balance: "Saldo Total", metric_expenses: "Gastos Mensuales", metric_savings: "Meta de Ahorro", metric_progress: "Progreso",
            chart_revenue: "Ingresos vs Crecimiento", chart_income_expense: "Ingresos vs Gastos", chart_traffic: "Categorías de Gastos", table_title: "Transacciones recientes", btn_add_trans: "Añadir transacción", btn_download_pdf: "Descargar PDF",
            th_id: "ID de transacción", th_date: "Fecha", th_type: "Tipo", th_category: "Categoría", type_income: "Ingreso", type_expense: "Gasto", th_amount: "Cantidad", th_status: "Estado",
            settings_title: "Configuración", set_tab_profile: "Perfil", set_tab_security: "Seguridad", set_tab_theme: "Tema", set_tab_lang: "Idioma", expense_goal: "Límite de Gasto Mensual"
        },
        fr: {
            nav_dashboard: "Tableau de bord", nav_features: "Fonctionnalités", nav_demo: "Démo", nav_pricing: "Tarification", nav_logout: "Déconnexion",
            menu_profile: "Mon profil", menu_settings: "Paramètres",
            metric_revenue: "Revenu total", metric_users: "Utilisateurs actifs", metric_conversion: "Taux de conversion", metric_bounce: "Taux de rebond",
            metric_balance: "Solde Total", metric_expenses: "Dépenses Mensuelles", metric_savings: "Objectif d'épargne", metric_progress: "Progrès",
            chart_revenue: "Revenus vs Croissance", chart_income_expense: "Revenus vs Dépenses", chart_traffic: "Catégories de Dépenses", table_title: "Transactions récentes", btn_add_trans: "Ajouter une transaction", btn_download_pdf: "Télécharger PDF",
            th_id: "ID de transaction", th_date: "Date", th_type: "Type", th_category: "Catégorie", type_income: "Revenu", type_expense: "Dépense", th_amount: "Montant", th_status: "Statut",
            settings_title: "Paramètres", set_tab_profile: "Profil", set_tab_security: "Sécurité", set_tab_theme: "Thème", set_tab_lang: "Langue", expense_goal: "Limite de Dépenses Mensuelles"
        },
        de: {
            nav_dashboard: "Dashboard", nav_features: "Funktionen", nav_demo: "Demo", nav_pricing: "Preise", nav_logout: "Abmelden",
            menu_profile: "Mein Profil", menu_settings: "Einstellungen",
            metric_revenue: "Gesamtumsatz", metric_users: "Aktive Nutzer", metric_conversion: "Konversionsrate", metric_bounce: "Absprungrate",
            metric_balance: "Gesamtsaldo", metric_expenses: "Monatliche Ausgaben", metric_savings: "Sparziel", metric_progress: "Zielerreichung",
            chart_revenue: "Umsatz vs. Wachstum", chart_income_expense: "Einnahmen vs Ausgaben", chart_traffic: "Ausgabenkategorien", table_title: "Aktuelle Transaktionen", btn_add_trans: "Transaktion hinzufügen", btn_download_pdf: "PDF herunterladen",
            th_id: "Transaktions-ID", th_date: "Datum", th_type: "Typ", th_category: "Kategorie", type_income: "Einkommen", type_expense: "Ausgabe", th_amount: "Betrag", th_status: "Status",
            settings_title: "Einstellungen", set_tab_profile: "Profilinfo", set_tab_security: "Sicherheit", set_tab_theme: "Thema", set_tab_lang: "Sprache", expense_goal: "Monatliches Ausgabenlimit"
        },
        zh: {
            nav_dashboard: "仪表板", nav_features: "特征", nav_demo: "演示", nav_pricing: "定价", nav_logout: "登出",
            menu_profile: "我的档案", menu_settings: "设置",
            metric_revenue: "总收入", metric_users: "活跃用户", metric_conversion: "转化率", metric_bounce: "跳出率",
            metric_balance: "总余额", metric_expenses: "每月支出", metric_savings: "储蓄目标", metric_progress: "目标进度",
            chart_revenue: "收入与增长", chart_income_expense: "收入与支出", chart_traffic: "支出类别", table_title: "最近交易", btn_add_trans: "添加交易", btn_download_pdf: "下载 PDF",
            th_id: "交易ID", th_date: "日期", th_type: "类型", th_category: "类别", type_income: "收入", type_expense: "支出", th_amount: "金额", th_status: "状态",
            settings_title: "设置", set_tab_profile: "个人信息", set_tab_security: "安全", set_tab_theme: "主题", set_tab_lang: "语言", expense_goal: "每月支出限额"
        },
        ja: {
            nav_dashboard: "ダッシュボード", nav_features: "機能", nav_demo: "デモ", nav_pricing: "価格", nav_logout: "ログアウト",
            menu_profile: "マイプロフィール", menu_settings: "設定",
            metric_revenue: "総収益", metric_users: "アクティブユーザー", metric_conversion: "コンバージョン率", metric_bounce: "直帰率",
            metric_balance: "合計残高", metric_expenses: "月間支出", metric_savings: "貯蓄目標", metric_progress: "目標進捗",
            chart_revenue: "収益対成長", chart_income_expense: "収入対支出", chart_traffic: "支出カテゴリ", table_title: "最近の取引", btn_add_trans: "取引を追加", btn_download_pdf: "PDFをダウンロード",
            th_id: "取引ID", th_date: "日付", th_type: "タイプ", th_category: "カテゴリー", type_income: "収入", type_expense: "支出", th_amount: "金額", th_status: "ステータス",
            settings_title: "設定", set_tab_profile: "プロフィール", set_tab_security: "セキュリティ", set_tab_theme: "テーマ", set_tab_lang: "言語", expense_goal: "月間支出限度額"
        },
        hi: {
            nav_dashboard: "डैशबोर्ड", nav_features: "विशेषताएं", nav_demo: "डेमो", nav_pricing: "मूल्य निर्धारण", nav_logout: "लॉग आउट",
            menu_profile: "मेरी प्रोफ़ाइल", menu_settings: "सेटिंग्स",
            metric_revenue: "कुल आय", metric_users: "सक्रिय उपयोगकर्ता", metric_conversion: "रूपांतरण दर", metric_bounce: "उछाल दर",
            metric_balance: "कुल शेष", metric_expenses: "मासिक खर्च", metric_savings: "बचत लक्ष्य", metric_progress: "लक्ष्य प्रगति",
            chart_revenue: "आय बनाम वृद्धि", chart_income_expense: "आय बनाम खर्च", chart_traffic: "खर्च की श्रेणियां", table_title: "हाल के लेनदेन", btn_add_trans: "लेनदेन जोड़ें", btn_download_pdf: "पीडीएफ डाउनलोड करें",
            th_id: "लेनदेन आईडी", th_date: "तारीख", th_type: "प्रकार", th_category: "श्रेणी", type_income: "आय", type_expense: "खर्च", th_amount: "रकम", th_status: "स्थिति",
            settings_title: "सेटिंग्स", set_tab_profile: "प्रोफ़ाइल जानकारी", set_tab_security: "सुरक्षा", set_tab_theme: "थीम", set_tab_lang: "भाषा", expense_goal: "मासिक खर्च सीमा"
        }
    };

    // --- Utility: Show Toast Notification ---
    function showToast(message, isError = false) {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        if (isError) {
            toast.style.borderLeftColor = '#EF4444';
        }
        
        const msgSpan = document.createElement('span');
        msgSpan.className = 'toast-message';
        msgSpan.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        };

        toast.appendChild(msgSpan);
        toast.appendChild(closeBtn);
        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);
    }

    function applyLanguage(lang) {
        if (!translations[lang]) return;
        const dict = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });
    }

    // --- Utility: Format Currency Intelligently per Ethnicity/Region ---
    function formatMoney(amount, symbol = '$') {
        let locale = 'en-US';
        let fractionDigits = 2;

        switch (symbol) {
            case '₹': locale = 'en-IN'; break; // Indian numbering
            case '€': locale = 'de-DE'; break; // European decimals (Bureau)
            case '£': locale = 'en-GB'; break; // British format (Lbs)
            case '¥': locale = 'ja-JP'; fractionDigits = 0; break; // Yen/Yuan (no decimals)
            case '₩': locale = 'ko-KR'; fractionDigits = 0; break; // Won
            case 'Rp': locale = 'id-ID'; fractionDigits = 0; break; // Rupiah
            case 'R$': locale = 'pt-BR'; break; // Brazilian format
            case 'R':  locale = 'en-ZA'; break; // South African format
            default: locale = 'en-US'; break; // US/Default formatting (Bowlers)
        }

        return new Intl.NumberFormat(locale, { 
            minimumFractionDigits: fractionDigits, 
            maximumFractionDigits: fractionDigits 
        }).format(amount);
    }

    // --- Utility: Format Time Ago ---
    function formatTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        if (diffInSeconds < 60) return 'Just now';
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} days ago`;
    }

    // --- Utility: Render Notifications ---
    function renderNotifications(user) {
        const notificationList = document.getElementById('notification-list');
        const notificationBell = document.getElementById('notification-bell');
        if (!notificationList || !notificationBell) return;

        const notifs = user.notifications || [];
        notificationList.innerHTML = '';

        const hasUnread = notifs.some(n => !n.read);
        if (hasUnread) notificationBell.classList.add('has-unread');
        else notificationBell.classList.remove('has-unread');

        if (notifs.length === 0) {
            notificationList.innerHTML = '<li style="padding: 15px 20px; text-align: center; color: var(--secondary-color);">No notifications yet.</li>';
            return;
        }

        notifs.forEach(notif => {
            let iconHtml = '<i class="fas fa-arrow-down"></i>';
            let styleStr = 'background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3);';
            
            if (notif.type === 'income') {
                iconHtml = '<i class="fas fa-arrow-up"></i>';
                styleStr = 'background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);';
            } else if (notif.type === 'system') {
                iconHtml = '<i class="fas fa-user"></i>';
                styleStr = 'background: rgba(168, 85, 247, 0.15); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3);';
            } else if (notif.type === 'budget') {
                iconHtml = '<i class="fas fa-bullseye"></i>';
                styleStr = 'background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);';
            }

            const li = document.createElement('li');
            li.className = `notification-item ${notif.read ? '' : 'unread'}`;
            li.innerHTML = `
                <div class="notif-icon" style="${styleStr}">${iconHtml}</div>
                <div class="notif-content"><p><strong>${notif.title}</strong>: ${notif.message}</p><span class="notif-time">${formatTimeAgo(notif.time)}</span></div>
            `;
            notificationList.appendChild(li);
        });
    }

    // --- Utility: Add Notification ---
    function addNotification(user, type, title, message) {
        // Intercept and stop if user has disabled notifications
        if (user.notificationsEnabled === false) return;

        if (!user.notifications) user.notifications = [];
        user.notifications.unshift({ id: Date.now().toString(), type, title, message, time: new Date().toISOString(), read: false });
        if (user.notifications.length > 20) user.notifications.pop(); // Keep limit to 20
        
        localStorage.setItem('analyticaUser', JSON.stringify(user));
        let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
        const userIndex = users.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            users[userIndex].notifications = user.notifications;
            localStorage.setItem('analyticaUsers', JSON.stringify(users));
        }
        renderNotifications(user);
    }

    function setupUI(user) {
        const profile = user.profile;
        const username = user.username || 'User';
        const greeting = `Welcome, ${username}! `;
        const initials = username.split(' ').map(n => n[0]).join('').toUpperCase();
        
        // Dynamic Device Info Initialization
        if(currentDeviceInfo && !currentDeviceInfo.dataset.initialized) {
            const navAgent = navigator.userAgent;
            let browser = "Web Browser";
            if (navAgent.indexOf("Chrome") !== -1) browser = "Chrome";
            else if (navAgent.indexOf("Safari") !== -1) browser = "Safari";
            else if (navAgent.indexOf("Firefox") !== -1) browser = "Firefox";
            const now = new Date();
            currentDeviceInfo.innerHTML = `${browser} <br>Session Started: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            currentDeviceInfo.dataset.initialized = 'true';
        }

        // Smart Analytics Calculation
        let totalIncome = 0;
        let totalExpense = 0;
        let monthlyExpense = 0;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const txs = user.transactions || [];
        
        txs.forEach(tx => {
            const amt = parseFloat(tx.amount) || 0;
            const txDate = new Date(tx.date);
            const txMonth = txDate.getMonth();
            const txYear = txDate.getFullYear();
            if (tx.type === 'Income') {
                totalIncome += amt;
            } else {
                totalExpense += amt;
                if (txMonth === currentMonth && txYear === currentYear) {
                    monthlyExpense += amt;
                }
            }
        });
        
        const initialBalance = parseFloat(user.initialBalance) || 0;
        const remainingBalance = initialBalance + totalIncome - totalExpense;
        const savingsGoal = parseFloat(user.savingsGoal) || 0;
        const progress = savingsGoal > 0 ? Math.min(100, (remainingBalance / savingsGoal) * 100).toFixed(1) : 0;
        const curSymbol = user.currency || '$';

        // Dynamic DOM assignments
        const metric1Title = document.getElementById('metric1-title');
        const metric1Value = document.getElementById('metric1-value');
        const metric2Title = document.getElementById('metric2-title');
        const metric2Value = document.getElementById('metric2-value');
        const metric3Title = document.getElementById('metric3-title');
        const metric3Value = document.getElementById('metric3-value');
        const metric4Title = document.getElementById('metric4-title');
        const metric4Value = document.getElementById('metric4-value');
        const mainChartTitle = document.getElementById('main-chart-title');

        // --- Dynamically Inject the 5th Card for Remaining Balance ---
        let metric5Value = document.getElementById('metric5-value');
        let metric5Title = document.getElementById('metric5-title');
        if (!metric5Value && metric1Value) {
            const metricsRow = metric1Value.closest('.metrics-row');
            if (metricsRow) {
                const newCard = document.createElement('div');
                newCard.className = 'metric-card';
                newCard.innerHTML = `
                    <div class="metric-title" id="metric5-title">Remaining Balance</div>
                    <div class="metric-value" id="metric5-value"></div>
                `;
                const metric3Card = metric3Value ? metric3Value.closest('.metric-card') : null;
                if (metric3Card) {
                    metricsRow.insertBefore(newCard, metric3Card);
                } else {
                    metricsRow.appendChild(newCard);
                }
                metric5Value = document.getElementById('metric5-value');
                metric5Title = document.getElementById('metric5-title');
            }
        }

        // --- Utility: Save User and Refresh UI ---
        const saveUserAndUpdate = (updatedUser) => {
            localStorage.setItem('analyticaUser', JSON.stringify(updatedUser));
            let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
            const userIndex = users.findIndex(u => u.username === updatedUser.username);
            if (userIndex !== -1) {
                users[userIndex] = {...users[userIndex], ...updatedUser};
                localStorage.setItem('analyticaUsers', JSON.stringify(users));
            }
            setupUI(updatedUser);
        };

        // --- Make Dashboard Metric Cards Interactive ---
        if (metric1Value) {
            const balanceCard = metric1Value.closest('.metric-card');
            if (balanceCard && !balanceCard.dataset.interactive) {
                balanceCard.dataset.interactive = 'true';
                balanceCard.title = "Click to set Initial Balance";
                balanceCard.addEventListener('click', () => {
                    const input = prompt("Enter your initial starting balance:", user.initialBalance || 0);
                    const parsed = input ? parseFloat(input.replace(/[^0-9.-]+/g, '')) : NaN;
                    if (input !== null && !isNaN(parsed)) {
                        user.initialBalance = parsed;
                        saveUserAndUpdate(user);
                    }
                });
            }
        }

        if (metric3Value) {
            const savingsCard = metric3Value.closest('.metric-card');
            if (savingsCard && !savingsCard.dataset.interactive) {
                savingsCard.dataset.interactive = 'true';
                savingsCard.title = "Click to set Savings Goal";
                savingsCard.addEventListener('click', () => {
                    const input = prompt("Enter your savings goal:", user.savingsGoal || 0);
                    const parsed = input ? parseFloat(input.replace(/[^0-9.-]+/g, '')) : NaN;
                    if (input !== null && !isNaN(parsed)) {
                        user.savingsGoal = parsed;
                        if (settingSavings) settingSavings.value = parsed;
                        saveUserAndUpdate(user);
                    }
                });
            }
        }

        // Student-specific UI
        if (profile === 'student') { 
            if (studentSavingsGroup) studentSavingsGroup.classList.remove('hidden');
            if (studentExpenseGoalGroup) studentExpenseGoalGroup.classList.remove('hidden');

            // Student Dashboard Metrics
            metric1Title.setAttribute('data-i18n', 'metric_balance');
            
            // Add hint for new users to set initial balance
            let balanceHint = '';
            if (user.initialBalance === undefined) {
                balanceHint = `<div style="font-size: 0.85rem; color: var(--primary-color); margin-top: 8px; font-weight: normal;">👋 Click here to set your starting balance</div>`;
            }
            metric1Value.innerHTML = `${curSymbol}${formatMoney(initialBalance, curSymbol)}${balanceHint}`;
            
            // Check if the user has started using the app (set a balance or added transactions)
            const hasStarted = user.initialBalance !== undefined || txs.length > 0;

            if (!hasStarted) {
                metric2Title.innerHTML = `<span data-i18n="metric_expenses">Monthly Expenses</span>`;
                metric2Value.innerHTML = '<span style="color: var(--secondary-color); font-size: 1.5rem;">-</span>';
                
                metric3Title.setAttribute('data-i18n', 'metric_savings');
                metric3Value.innerHTML = '<span style="color: var(--secondary-color); font-size: 1.5rem;">-</span>';
                
                metric4Title.setAttribute('data-i18n', 'metric_progress');
                metric4Value.innerHTML = '<span style="color: var(--secondary-color); font-size: 1.5rem;">-</span>';

                if (metric5Value) {
                    metric5Value.closest('.metric-card').classList.remove('hidden');
                    metric5Title.innerHTML = `<span>Remaining Balance</span>`;
                    metric5Value.innerHTML = '<span style="color: var(--secondary-color); font-size: 1.5rem;">-</span>';
                    metric5Value.style.color = '';
                }
            } else {
                metric2Title.removeAttribute('data-i18n');
                const expGoalStr = user.expenseGoal && parseFloat(user.expenseGoal) > 0 ? `<span style="font-size: 1rem; color: var(--secondary-color);"> / ${curSymbol}${formatMoney(parseFloat(user.expenseGoal), curSymbol)}</span>` : '';
                metric2Value.innerHTML = `${curSymbol}${formatMoney(monthlyExpense, curSymbol)}${expGoalStr}`;
                
                if (user.expenseGoal && parseFloat(user.expenseGoal) > 0 && monthlyExpense > parseFloat(user.expenseGoal)) {
                    metric2Value.style.color = '#EF4444';
                    metric2Title.innerHTML = `<span data-i18n="metric_expenses">Monthly Expenses</span> <i class="fas fa-exclamation-circle alert-icon" style="color: #EF4444; margin-left: 5px;" title="Over Budget!"></i>`;
                    
                    // --- TRIGGER BUDGET ALERT NOTIFICATION ---
                    const monthYearStr = `${currentYear}-${currentMonth}`;
                    if (user.lastBudgetAlertMonth !== monthYearStr) {
                        user.lastBudgetAlertMonth = monthYearStr;
                        addNotification(user, 'budget', 'Budget Alert', `You've exceeded your monthly limit of ${curSymbol}${formatMoney(parseFloat(user.expenseGoal), curSymbol)}!`);
                        
                        let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
                        const userIndex = users.findIndex(u => u.username === user.username);
                        if (userIndex !== -1) {
                            users[userIndex].lastBudgetAlertMonth = monthYearStr;
                            localStorage.setItem('analyticaUsers', JSON.stringify(users));
                        }
                    }
                } else {
                    metric2Value.style.color = '';
                    metric2Title.innerHTML = `<span data-i18n="metric_expenses">Monthly Expenses</span>`;
                    
                    // --- RESET BUDGET ALERT FLAG ---
                    const monthYearStr = `${currentYear}-${currentMonth}`;
                    if (user.lastBudgetAlertMonth === monthYearStr) {
                        user.lastBudgetAlertMonth = null;
                        localStorage.setItem('analyticaUser', JSON.stringify(user));
                        let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
                        const userIndex = users.findIndex(u => u.username === user.username);
                        if (userIndex !== -1) {
                            users[userIndex].lastBudgetAlertMonth = null;
                            localStorage.setItem('analyticaUsers', JSON.stringify(users));
                        }
                    }
                }
                
                const expensePercent = user.expenseGoal && parseFloat(user.expenseGoal) > 0 ? Math.min(100, (monthlyExpense / parseFloat(user.expenseGoal)) * 100) : 0;
                const expColor = expensePercent >= 100 ? '#EF4444' : (expensePercent > 80 ? '#F59E0B' : '#10B981');
                const expProgressHTML = user.expenseGoal && parseFloat(user.expenseGoal) > 0 ? `<div class="metric-progress-bg"><div class="metric-progress-fill" style="width: ${expensePercent}%; background-color: ${expColor};"></div></div>` : '';
                metric2Value.innerHTML += expProgressHTML;

                metric3Title.setAttribute('data-i18n', 'metric_savings');
                metric3Value.textContent = savingsGoal > 0 ? `${curSymbol}${formatMoney(savingsGoal, curSymbol)}` : 'Not Set';
                
                metric4Title.setAttribute('data-i18n', 'metric_progress');
                metric4Value.innerHTML = `${progress}% <div class="metric-progress-bg"><div class="metric-progress-fill" style="width: ${progress}%; background-color: var(--primary-color);"></div></div>`;
                
                if (metric5Value) {
                    metric5Value.closest('.metric-card').classList.remove('hidden');
                    metric5Title.innerHTML = `<span>Remaining Balance</span>`;
                    metric5Value.textContent = `${curSymbol}${formatMoney(remainingBalance, curSymbol)}`;
                    metric5Value.style.color = remainingBalance < 0 ? '#EF4444' : '';
                }
            }

            mainChartTitle.setAttribute('data-i18n', 'chart_income_expense');

        } else { // Business-specific UI
            if (studentSavingsGroup) studentSavingsGroup.classList.add('hidden');
            if (studentExpenseGoalGroup) studentExpenseGoalGroup.classList.add('hidden');

            // Original Business Metrics
            metric1Title.setAttribute('data-i18n', 'metric_revenue');
            metric1Value.textContent = `${curSymbol}124,500`;
            
            metric2Title.removeAttribute('data-i18n');
            metric2Value.style.color = '';
            metric2Title.innerHTML = `<span data-i18n="metric_users">Active Users</span>`;
            metric2Value.textContent = `45,231`;
            
            metric3Title.setAttribute('data-i18n', 'metric_conversion');
            metric3Value.textContent = `3.24%`;
            
            metric4Title.setAttribute('data-i18n', 'metric_bounce');
            metric4Value.textContent = `42.1%`;
            
            mainChartTitle.setAttribute('data-i18n', 'chart_revenue');

            // Hide the extra card if switched to business view
            if (metric5Value) {
                metric5Value.closest('.metric-card').classList.add('hidden');
            }
        }

        // Update profile display in the header
        if (profileName && profileImg) {
            profileName.textContent = username;
            profileImg.textContent = initials;
            if (user.profilePicture) {
                profileImg.innerHTML = `<img src="${user.profilePicture}" alt="Profile">`;
            } else {
                profileImg.textContent = initials;
            }
        }

        renderTransactions(user);
        updateMainChart(user);
        updateCategoryChart(user);
        renderNotifications(user);
        applyLanguage(localStorage.getItem('analyticaLanguage') || 'en');
    }

    function renderTransactions(user) {
        if (!transactionsTbody) return;
        const curSymbol = user.currency || '$';
        const txs = user.transactions || [];
        transactionsTbody.innerHTML = '';
        
        const filterValue = transactionFilter ? transactionFilter.value : 'All';
        const searchInput = document.querySelector('.search-bar input');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        let displayTxs = [...txs];

        if (filterValue === 'Income') {
            displayTxs = displayTxs.filter(tx => tx.type === 'Income');
        } else if (filterValue !== 'All') {
            displayTxs = displayTxs.filter(tx => tx.type === 'Expense' && tx.category === filterValue);
        }

        if (searchTerm) {
            displayTxs = displayTxs.filter(tx => 
                tx.id.toLowerCase().includes(searchTerm) || 
                (tx.category && tx.category.toLowerCase().includes(searchTerm)) ||
                (tx.amount && tx.amount.toString().includes(searchTerm))
            );
        }

        // --- Sorting Logic ---
        displayTxs.sort((a, b) => {
            let valA = a[currentSortColumn] || '';
            let valB = b[currentSortColumn] || '';

            if (currentSortColumn === 'amount') {
                valA = parseFloat(valA.toString().replace(/[^0-9.-]+/g, '')) || 0;
                valB = parseFloat(valB.toString().replace(/[^0-9.-]+/g, '')) || 0;
            } else if (currentSortColumn === 'date') {
                valA = new Date(valA).getTime() || 0;
                valB = new Date(valB).getTime() || 0;
            } else {
                valA = valA.toString().toLowerCase();
                valB = valB.toString().toLowerCase();
            }

            if (valA < valB) return currentSortAsc ? -1 : 1;
            if (valA > valB) return currentSortAsc ? 1 : -1;
            return 0;
        });

        if (displayTxs.length === 0) {
            transactionsTbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 50px 20px; color: var(--secondary-color);">
                        <div style="background-color: var(--background-color); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                            <i class="fas fa-receipt" style="font-size: 2.5rem; color: var(--primary-color); opacity: 0.7;"></i>
                        </div>
                        <p style="margin: 0; font-size: 1.2rem; font-weight: 600; color: var(--text-color);">No transactions found</p>
                        <p style="margin: 5px 0 0; font-size: 0.95rem;">${txs.length === 0 ? "It looks like you haven't added any records yet. Click 'Add Transaction' to start tracking!" : "No transactions match the selected filter."}</p>
                    </td>
                </tr>
            `;
            return;
        }

        // --- Pagination Logic ---
        const totalTxs = displayTxs.length;
        if (!window.showingAllTxs) {
            displayTxs = displayTxs.slice(0, 10);
        }
        
        displayTxs.forEach(tx => {
            const statusClass = tx.status.toLowerCase();
            const typeHTML = tx.type === 'Income' ? '<span style="color: #10B981;"><i class="fas fa-arrow-up"></i> Income</span>' : '<span style="color: #EF4444;"><i class="fas fa-arrow-down"></i> Expense</span>';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${tx.id}</td>
                <td>${tx.date}</td>
                <td>${typeHTML}</td>
                <td>${tx.category || '-'}</td>
                <td>${curSymbol}${formatMoney(parseFloat(tx.amount.toString().replace(/,/g, '')), curSymbol)}</td>
                <td><span class="status-badge status-${statusClass}">${tx.status}</span></td>
                <td style="text-align: right;">
                    <button class="btn-icon edit-tx-btn" data-id="${tx.id}" title="Edit Transaction" style="margin-right: 10px;"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete-tx-btn" data-id="${tx.id}" title="Delete Transaction"><i class="fas fa-trash"></i></button>
                </td>
            `;
            transactionsTbody.appendChild(tr);
        });

        // --- "View All" Toggle Buttons ---
        if (totalTxs > 10) {
            const tr = document.createElement('tr');
            if (!window.showingAllTxs) {
                tr.innerHTML = `<td colspan="7" style="text-align: center;"><button id="view-all-tx-btn" class="btn btn-secondary btn-small" style="margin-top: 10px;">View All Transactions (${totalTxs})</button></td>`;
                transactionsTbody.appendChild(tr);
                document.getElementById('view-all-tx-btn').addEventListener('click', () => {
                    window.showingAllTxs = true;
                    renderTransactions(JSON.parse(localStorage.getItem('analyticaUser')));
                });
            } else {
                tr.innerHTML = `<td colspan="7" style="text-align: center;"><button id="view-less-tx-btn" class="btn btn-secondary btn-small" style="margin-top: 10px;">Show Less</button></td>`;
                transactionsTbody.appendChild(tr);
                document.getElementById('view-less-tx-btn').addEventListener('click', () => {
                    window.showingAllTxs = false;
                    renderTransactions(JSON.parse(localStorage.getItem('analyticaUser')));
                });
            }
        }
    }

    function updateMainChart(user) {
        if (!mainDashboardChart) return;

        const profile = user.profile || 'student';
        const txs = user.transactions || [];
        
        // Calculate the maximum date from transactions to use as our trailing window baseline
        let latestDate = new Date();
        if (txs.length > 0) {
            const maxTime = Math.max(...txs.map(t => new Date(t.date).getTime()));
            if (!isNaN(maxTime)) latestDate = new Date(maxTime);
        }

        const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const labels = monthNamesShort;
        const incomeData = new Array(12).fill(0);
        const expenseData = new Array(12).fill(0);
        const targetYear = latestDate.getFullYear();

        txs.forEach(tx => {
            const txDate = new Date(tx.date);
            if (isNaN(txDate.getTime())) return;
            const amt = parseFloat(tx.amount.toString().replace(/,/g, '')) || 0;
            
            if (txDate.getFullYear() === targetYear) {
                const index = txDate.getMonth();
                tx.type === 'Income' ? incomeData[index] += amt : expenseData[index] += amt;
            }
        });

        mainDashboardChart.data.labels = labels;
        mainDashboardChart.data.datasets[0].label = profile === 'student' ? 'Income' : 'Revenue';
        mainDashboardChart.data.datasets[1].label = profile === 'student' ? 'Expenses' : 'Growth';
        mainDashboardChart.data.datasets[0].data = incomeData;
        mainDashboardChart.data.datasets[1].data = expenseData;

        const legendLabel1 = document.getElementById('legend-label-1');
        const legendLabel2 = document.getElementById('legend-label-2');
        if (legendLabel1) legendLabel1.textContent = mainDashboardChart.data.datasets[0].label;
        if (legendLabel2) legendLabel2.textContent = mainDashboardChart.data.datasets[1].label;

        mainDashboardChart.update();
    }

    function updateCategoryChart(user) {
        if (!categoryDoughnutChart) return;
        const txs = user.transactions || [];
        const categories = ['Food & Dining', 'Transportation', 'Housing', 'Utilities', 'Entertainment', 'Other'];
        const data = [0, 0, 0, 0, 0, 0];
        
        txs.forEach(tx => {
            if (tx.type === 'Expense') {
                const amt = parseFloat(tx.amount.toString().replace(/,/g, '')) || 0;
                let idx = categories.indexOf(tx.category);
                if (idx === -1) idx = 5; // Other
                data[idx] += amt;
            }
        });
        
        categoryDoughnutChart.data.datasets[0].data = data;
        categoryDoughnutChart.update();
    }

    function showAppView(user) {
        authView.classList.add('hidden');
        appView.classList.remove('hidden');
        
        // Explicitly set the initial view to the Dashboard page
        const dashLink = document.querySelector('.sidebar-menu a[href="#dashboard"]');
        if (dashLink) dashLink.click();

        initializeDashboardCharts(); // Initialize charts when the view is shown
        setupUI(user);
    }

    function simulateLoading(user) {
        authView.classList.add('hidden');
        loadingView.classList.remove('hidden');
        setTimeout(() => {
            loadingView.classList.add('hidden');
            showAppView(user);
        }, 1500); // 1.5 seconds mock delay
    }

    // --- Auth Logic ---
    // Dynamically inject "Remember Me" checkbox into Login Form
    if (loginForm) {
        const loginSubmitBtn = loginForm.querySelector('button[type="submit"]');
        const forgotLinkContainer = loginForm.querySelector('.forgot-password-link-container');
        const targetElement = forgotLinkContainer || loginSubmitBtn;
        
        if (targetElement) {
            const rememberDiv = document.createElement('div');
            rememberDiv.className = 'form-group remember-me-group';
            rememberDiv.innerHTML = `
                <label class="radio-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: normal; margin-top: 5px; margin-bottom: 5px;">
                    <input type="checkbox" id="login-remember-me" style="width: auto; margin: 0; cursor: pointer;"> 
                    <span style="font-size: 0.9rem; color: var(--secondary-color);">Remember me</span>
                </label>
            `;
            targetElement.parentNode.insertBefore(rememberDiv, targetElement);
        }
        
        // Pre-fill credentials if saved
        const savedCreds = JSON.parse(localStorage.getItem('analyticaRememberMe'));
        if (savedCreds) {
            const identifierInput = document.getElementById('login-identifier');
            const passwordInput = document.getElementById('login-password');
            if (identifierInput) identifierInput.value = savedCreds.identifier;
            if (passwordInput) passwordInput.value = savedCreds.password;
        }
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tab = link.dataset.tab;
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            if (tab === 'signup') {
                signupForm.classList.add('active');
                loginForm.classList.remove('active');
            } else {
                loginForm.classList.add('active');
                signupForm.classList.remove('active');
            }
            forgotPasswordForm.classList.remove('active');
            
            // Clear any lingering messages when switching tabs
            loginMessage.textContent = '';
            
            // Ensure Remember Me checkbox stays checked if credentials exist
            const rememberCheck = document.getElementById('login-remember-me');
            if (rememberCheck && localStorage.getItem('analyticaRememberMe')) {
                rememberCheck.checked = true;
            }
        });
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const country = document.getElementById('signup-country').value;
        const profile = document.querySelector('input[name="profile"]:checked').value;
        
        let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
        
        // Check for duplicates before registering
        if (users.some(u => u.email === email || u.username === username)) {
            if (signupMessage) {
                signupMessage.style.color = '#EF4444';
                signupMessage.textContent = 'Account with this email or username already exists!';
            } else { showToast('Email or username already exists!', true); }
            return;
        }

        const countryCurrencyMap = {
            'US': '$', 'GB': '£', 'DE': '€', 'JP': '¥', 'IN': '₹',
            'CN': '¥', 'BR': 'R$', 'ZA': 'R', 'KR': '₩', 'ID': 'Rp',
            'AU': '$', 'CA': '$'
        };
        const currency = countryCurrencyMap[country] || '$';

        const user = { 
            email, username, password, profile, country, transactions: [], 
            notifications: [{
                id: Date.now().toString(), type: 'system', title: 'Welcome!', 
                message: 'Your profile is ready.', time: new Date().toISOString(), read: false
            }], 
            currency: currency 
        };
        users.push(user);
        localStorage.setItem('analyticaUsers', JSON.stringify(users));
        
        // Switch UI to login tab
        tabLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.auth-tab-link[data-tab="login"]').classList.add('active');
        signupForm.classList.remove('active');
        loginForm.classList.add('active');

        // Show success message
        loginMessage.style.color = '#10B981'; // Green for success
        loginMessage.textContent = 'Account created successfully! Please log in.';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginMessage.style.color = ''; // Reset color to CSS default (red)
        loginMessage.textContent = '';
        const identifier = document.getElementById('login-identifier').value;
        const password = document.getElementById('login-password').value;
        
        let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
        
        // Check for legacy single user and migrate to array
        const legacyUser = JSON.parse(localStorage.getItem('analyticaRegisteredUser'));
        if (legacyUser) {
            if (!users.some(u => u.username === legacyUser.username)) {
                users.push(legacyUser);
            }
            localStorage.removeItem('analyticaRegisteredUser');
            localStorage.setItem('analyticaUsers', JSON.stringify(users));
        }
        
        if (users.length > 0) {
            const matchedUser = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
            const identifierMatched = users.some(u => u.email === identifier || u.username === identifier);
            
            if (matchedUser) {
                // --- Remember Me Logic ---
                const rememberCheck = document.getElementById('login-remember-me');
                if (rememberCheck && rememberCheck.checked) {
                    localStorage.setItem('analyticaRememberMe', JSON.stringify({ identifier, password }));
                } else {
                    localStorage.removeItem('analyticaRememberMe');
                }

                // Valid credentials
                localStorage.setItem('analyticaUser', JSON.stringify(matchedUser));
                simulateLoading(matchedUser);
            } else if (identifierMatched) {
                loginMessage.textContent = 'Incorrect password.';
            } else {
                loginMessage.textContent = 'No account found with that email or username.';
            }
        } else {
            loginMessage.textContent = 'No account found. Please sign up first.';
        }
    });

    // --- Forgot Password Logic ---
    showForgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        authTabs.classList.add('hidden');
        forgotPasswordForm.classList.add('active');
    });

    backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        forgotPasswordForm.classList.remove('active');
        authTabs.classList.remove('hidden');
        loginForm.classList.add('active');
        resetMessage.textContent = ''; // clear any previous messages
    });

    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        resetMessage.textContent = 'Password reset link sent to your email!';
        resetMessage.style.color = '#10B981'; // Green text for success message
    });

    function handleLogout(e) {
        if (e) e.preventDefault();
        localStorage.removeItem('analyticaUser');
        window.location.reload();
    }

    logoutButton.addEventListener('click', handleLogout);
    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', handleLogout);
    }

    // --- Profile Dropdown Logic ---
    if (profileDropdownBtn && profileMenu) {
        profileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents document click from closing it immediately
            profileMenu.classList.toggle('show');
            profileDropdownBtn.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!profileDropdownBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
                profileDropdownBtn.classList.remove('active');
            }
        });
    }

    // --- Notification Dropdown Logic ---
    if (notificationBell && notificationMenu) {
        notificationBell.addEventListener('click', (e) => {
            e.stopPropagation(); 
            notificationMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!notificationBell.contains(e.target) && !notificationMenu.contains(e.target)) {
                notificationMenu.classList.remove('show');
            }
        });
        
        if (markReadBtn) markReadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let user = JSON.parse(localStorage.getItem('analyticaUser'));
            if (user && user.notifications) {
                user.notifications.forEach(n => n.read = true);
                localStorage.setItem('analyticaUser', JSON.stringify(user));
                
                let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
                const userIndex = users.findIndex(u => u.username === user.username);
                if (userIndex !== -1) {
                    users[userIndex].notifications = user.notifications;
                    localStorage.setItem('analyticaUsers', JSON.stringify(users));
                }
                renderNotifications(user);
            }
        });
    }

    // --- My Profile Modal Logic ---
    if (myProfileLink && profileModal) {
        myProfileLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Close dropdown
            profileMenu.classList.remove('show');
            profileDropdownBtn.classList.remove('active');
            
            // Populate form with existing data
            const user = JSON.parse(localStorage.getItem('analyticaUser')) || {};
            profileAgeInput.value = user.age || '';
            profileOccupationInput.value = user.occupation || '';
            
            const username = user.username || 'User';
            const initials = username.split(' ').map(n => n[0]).join('').toUpperCase();
            
            if (user.profilePicture) {
                modalProfileImg.innerHTML = `<img src="${user.profilePicture}" alt="Profile">`;
                modalProfileImg.dataset.tempImage = user.profilePicture;
            } else {
                modalProfileImg.innerHTML = initials;
                modalProfileImg.dataset.tempImage = ''; // Clear any temp image
            }

            profileModal.classList.remove('hidden');
        });

        closeProfileModal.addEventListener('click', () => {
            profileModal.classList.add('hidden');
            profileUpdateMessage.textContent = '';
        });

        window.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                profileModal.classList.add('hidden');
                profileUpdateMessage.textContent = '';
            }
        });

        // Image preview logic via FileReader
        profilePictureInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    modalProfileImg.innerHTML = `<img src="${event.target.result}" alt="Profile">`;
                    modalProfileImg.dataset.tempImage = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        profileUpdateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let user = JSON.parse(localStorage.getItem('analyticaUser'));
            if (!user) return;
            
            user.age = profileAgeInput.value;
            user.occupation = profileOccupationInput.value;
            
            // If they uploaded a new image, save it
            if (modalProfileImg.dataset.tempImage) {
                user.profilePicture = modalProfileImg.dataset.tempImage;
            }

            localStorage.setItem('analyticaUser', JSON.stringify(user));
            
            // Sync with global users list
            let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
            const userIndex = users.findIndex(u => u.username === user.username);
            if (userIndex !== -1) {
                users[userIndex] = {...users[userIndex], ...user};
                localStorage.setItem('analyticaUsers', JSON.stringify(users));
            }
            
            // Reflect updates in header immediately
            setupUI(user);
            
            profileModal.classList.add('hidden');
            showToast('Profile updated successfully!');
            profileUpdateMessage.textContent = '';
        });
    }

    // --- Transaction Form Modal Logic ---
    if (addTransactionBtn && transactionModal) {
        const transTypeInput = document.getElementById('trans-type');
        const transCategoryInput = document.getElementById('trans-category');
        const transDateInput = document.getElementById('trans-date');
        
        // Prevent selecting future dates in the date picker
        if (transDateInput) {
            const today = new Date();
            const localDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
            transDateInput.setAttribute('max', localDate);
        }
        
        if (transTypeInput && transCategoryInput) {
            transTypeInput.addEventListener('change', (e) => {
                const categoryGroup = transCategoryInput.closest('.form-group');
                if (e.target.value === 'Income') {
                    categoryGroup.classList.add('hidden');
                    transCategoryInput.removeAttribute('required');
                } else {
                    categoryGroup.classList.remove('hidden');
                    transCategoryInput.setAttribute('required', 'required');
                }
            });
        }

        addTransactionBtn.addEventListener('click', () => {
            editingTransactionId = null;
            transactionForm.reset();
            if (transTypeInput) transTypeInput.dispatchEvent(new Event('change'));
            if (transactionModalTitle) transactionModalTitle.textContent = 'Add New Transaction';
            transactionModal.classList.remove('hidden');
        });

        closeTransactionModal.addEventListener('click', () => {
            transactionModal.classList.add('hidden');
        });

        window.addEventListener('click', (e) => {
            if (e.target === transactionModal) transactionModal.classList.add('hidden');
        });

        transactionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let user = JSON.parse(localStorage.getItem('analyticaUser'));
            if (!user) return;
            if (!user.transactions) user.transactions = [];

            const amount = document.getElementById('trans-amount').value;
            const type = document.getElementById('trans-type').value;
            let category = document.getElementById('trans-category').value;
            if (type === 'Income') category = '-';
            const date = document.getElementById('trans-date').value;
            const status = document.getElementById('trans-status').value;

            // Validate that the selected date is not in the future
            const selectedDate = new Date(date);
            const todayDate = new Date();
            todayDate.setHours(23, 59, 59, 999); // Set to the very end of today
            if (selectedDate > todayDate) {
                showToast('Transactions cannot be added for future dates.', true);
                return;
            }

            if (editingTransactionId) {
                const txIndex = user.transactions.findIndex(tx => tx.id === editingTransactionId);
                if (txIndex !== -1) {
                    user.transactions[txIndex] = { ...user.transactions[txIndex], date, type, category, amount, status };
                }
                showToast('Transaction updated successfully!');
            } else {
                const id = `#TRX-${String(user.transactions.length + 1).padStart(3, '0')}`;
                user.transactions.push({ id, date, type, category, amount, status });
                showToast('Transaction added successfully!');

                // Automatically add a real-time notification
                const notifType = type === 'Income' ? 'income' : 'expense';
                const curSymbol = user.currency || '$';
                const formattedAmount = `${curSymbol}${formatMoney(parseFloat(amount), curSymbol)}`;
                addNotification(user, notifType, `${type} Tracked`, `Added ${category} for ${formattedAmount}`);
            }

            localStorage.setItem('analyticaUser', JSON.stringify(user));

            let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
            const userIndex = users.findIndex(u => u.username === user.username);
            if (userIndex !== -1) {
                users[userIndex].transactions = user.transactions;
                localStorage.setItem('analyticaUsers', JSON.stringify(users));
            }

            setupUI(user); // Updates UI, Metrics, & Render
            transactionModal.classList.add('hidden');
            transactionForm.reset();
            editingTransactionId = null;
        });
    }

    // --- Transaction Actions Logic (Edit / Delete) ---
    if (transactionsTbody) {
        transactionsTbody.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-tx-btn');
            const editBtn = e.target.closest('.edit-tx-btn');
            
            if (deleteBtn && deleteConfirmModal) {
                transactionToDelete = deleteBtn.getAttribute('data-id');
                deleteConfirmModal.classList.remove('hidden');
            } else if (editBtn && transactionModal) {
                editingTransactionId = editBtn.getAttribute('data-id');
                let user = JSON.parse(localStorage.getItem('analyticaUser'));
                if (!user || !user.transactions) return;
                
                const txToEdit = user.transactions.find(tx => tx.id === editingTransactionId);
                if (txToEdit) {
                    document.getElementById('trans-amount').value = txToEdit.amount;
                    
                    const transTypeInput = document.getElementById('trans-type');
                    transTypeInput.value = txToEdit.type || 'Expense';
                    transTypeInput.dispatchEvent(new Event('change'));

                    document.getElementById('trans-category').value = (txToEdit.category && txToEdit.category !== '-') ? txToEdit.category : 'Other';
                    document.getElementById('trans-date').value = txToEdit.date;
                    document.getElementById('trans-status').value = txToEdit.status;
                    
                    if (transactionModalTitle) transactionModalTitle.textContent = 'Edit Transaction';
                    transactionModal.classList.remove('hidden');
                }
            }
        });
    }

    if (deleteConfirmModal) {
        const hideDeleteModal = () => {
            deleteConfirmModal.classList.add('hidden');
            transactionToDelete = null;
        };

        closeDeleteModal.addEventListener('click', hideDeleteModal);
        cancelDeleteBtn.addEventListener('click', hideDeleteModal);
        window.addEventListener('click', (e) => { if (e.target === deleteConfirmModal) hideDeleteModal(); });

        confirmDeleteBtn.addEventListener('click', () => {
            if (!transactionToDelete) return;
            
            let user = JSON.parse(localStorage.getItem('analyticaUser'));
            if (!user) return;
            if (!user.transactions) user.transactions = [];

            // Filter out the selected transaction
            user.transactions = user.transactions.filter(tx => tx.id !== transactionToDelete);
            localStorage.setItem('analyticaUser', JSON.stringify(user));

            let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
            const userIndex = users.findIndex(u => u.username === user.username);
            if (userIndex !== -1) {
                users[userIndex].transactions = user.transactions;
                localStorage.setItem('analyticaUsers', JSON.stringify(users));
            }

            setupUI(user); // Automatically updates UI Metrics & re-renders table
            hideDeleteModal();
            showToast('Transaction deleted successfully!');
        });
    }

    // --- Transaction Filtering Logic ---
    if (transactionFilter) {
        transactionFilter.addEventListener('change', () => {
            const user = JSON.parse(localStorage.getItem('analyticaUser'));
            if (user) renderTransactions(user);
        });
    }

    // --- Global Search Filtering Logic ---
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const user = JSON.parse(localStorage.getItem('analyticaUser'));
            if (user) renderTransactions(user);
        });
    }

    // --- Download PDF Logic ---
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('analyticaUser'));
            if (!user) return;
            
            const curSymbol = user.currency || '$';
            const txs = user.transactions || [];
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Report Header
            doc.setFontSize(18);
            doc.text("Financial Transactions Report", 14, 22);
            
            doc.setFontSize(11);
            doc.setTextColor(100);
            doc.text(`Account Name: ${user.fullName || user.username || 'User'}`, 14, 30);
            doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 14, 36);

            // Table Structure
            const tableColumn = ["Transaction ID", "Date", "Type", "Category", "Amount", "Status"];
            const tableRows = [];

            // Reverse order to show the latest transactions at the top
            const displayTxs = [...txs].reverse();
            displayTxs.forEach(tx => {
                const amt = `${curSymbol}${parseFloat(tx.amount.toString().replace(/,/g, '')).toFixed(2)}`;
                tableRows.push([tx.id, tx.date, tx.type || '-', tx.category || '-', amt, tx.status]);
            });

            doc.autoTable({
                startY: 45,
                head: [tableColumn],
                body: tableRows,
                theme: 'striped',
                headStyles: { fillColor: [79, 70, 229] } // Matches the primary brand color
            });

            doc.save(`${user.username}_Transactions_Report.pdf`);
        });

        // --- Dynamically Inject Download CSV Button ---
        const downloadCsvBtn = document.createElement('button');
        downloadCsvBtn.className = 'btn btn-secondary btn-small';
        downloadCsvBtn.innerHTML = '<i class="fas fa-file-csv"></i> Download CSV';
        downloadCsvBtn.style.marginLeft = '10px';
        downloadPdfBtn.parentNode.insertBefore(downloadCsvBtn, downloadPdfBtn.nextSibling);

        downloadCsvBtn.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('analyticaUser'));
            if (!user || !user.transactions) return;
            
            const rows = [['Transaction ID', 'Date', 'Type', 'Category', 'Amount', 'Status']];
            const displayTxs = [...user.transactions].reverse();
            
            displayTxs.forEach(tx => {
                const amt = `${user.currency || '$'}${formatMoney(parseFloat(tx.amount.toString().replace(/,/g, '')), user.currency || '$')}`;
                rows.push([tx.id, tx.date, tx.type || '-', tx.category || '-', `"${amt}"`, tx.status]);
            });
            
            // Safely generate CSV using Blob to prevent '#' from truncating the file
            const csvString = rows.map(e => e.join(",")).join("\n");
            const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            link.setAttribute("href", URL.createObjectURL(blob));
            link.setAttribute("download", `${user.username}_Transactions_Report.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // --- Dynamically Inject Import CSV Button ---
        const importCsvBtn = document.createElement('label');
        importCsvBtn.className = 'btn btn-secondary btn-small';
        importCsvBtn.style.marginLeft = '10px';
        importCsvBtn.style.cursor = 'pointer';
        importCsvBtn.innerHTML = '<i class="fas fa-file-import"></i> Import CSV<input type="file" accept=".csv" style="display:none;" id="import-csv-input">';
        downloadPdfBtn.parentNode.insertBefore(importCsvBtn, downloadCsvBtn.nextSibling);

        const importInput = importCsvBtn.querySelector('#import-csv-input');
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const lines = event.target.result.split('\n');
                let user = JSON.parse(localStorage.getItem('analyticaUser'));
                let addedCount = 0;
                
                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].trim()) continue;
                    const cols = lines[i].split(',').map(c => c.replace(/(^"|"$)/g, '').trim());
                    if (cols.length >= 6) {
                        user.transactions.push({
                            id: cols[0].startsWith('#TRX') ? cols[0] : `#TRX-${String(user.transactions.length + 1).padStart(3, '0')}`,
                            date: cols[1], type: cols[2], category: cols[3],
                            amount: cols[4].replace(/[^0-9.-]+/g,""), status: cols[5]
                        });
                        addedCount++;
                    }
                }
                
                if (addedCount > 0) {
                    localStorage.setItem('analyticaUser', JSON.stringify(user));
                    let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
                    const userIndex = users.findIndex(u => u.username === user.username);
                    if (userIndex !== -1) {
                        users[userIndex].transactions = user.transactions;
                        localStorage.setItem('analyticaUsers', JSON.stringify(users));
                    }
                    setupUI(user);
                    showToast(`Successfully imported ${addedCount} transactions!`);
                } else { showToast('Invalid CSV format or empty file.', true); }
                importInput.value = ''; // Reset input
            };
            reader.readAsText(file);
        });
    }

    // --- Settings Modal Logic ---
    if (settingsLink && settingsModal) {
        settingsLink.addEventListener('click', (e) => {
            e.preventDefault();
            profileMenu.classList.remove('show');
            profileDropdownBtn.classList.remove('active');
            
            // Populate profile data
            const user = JSON.parse(localStorage.getItem('analyticaUser')) || {};
            settingName.value = user.fullName || '';
            settingAge.value = user.age || '';
            settingMobile.value = user.mobile || '';
            settingOccupation.value = user.occupation || '';
            if (settingCurrency) settingCurrency.value = user.currency || '$';
            if (settingSavings) settingSavings.value = user.savingsGoal || '';
            if (settingExpenseGoal) settingExpenseGoal.value = user.expenseGoal || '';
            if (settingNotifications) settingNotifications.checked = user.notificationsEnabled !== false; // Defaults to true

            // Populate profile picture inside settings
            if (settingsProfileImg) {
                const initials = (user.username || 'User').split(' ').map(n => n[0]).join('').toUpperCase();
                if (user.profilePicture) {
                    settingsProfileImg.innerHTML = `<img src="${user.profilePicture}" alt="Profile">`;
                    settingsProfileImg.dataset.tempImage = user.profilePicture;
                } else {
                    settingsProfileImg.innerHTML = initials;
                    settingsProfileImg.dataset.tempImage = '';
                }
            }

            // Load Theme Preference
            const savedTheme = localStorage.getItem('analyticaTheme') || 'light';
            themeRadios.forEach(radio => radio.checked = (radio.value === savedTheme));

            // Load Language Preference
            const savedLanguage = localStorage.getItem('analyticaLanguage') || 'en';
            languageSelect.value = savedLanguage;

            settingsModal.classList.remove('hidden');
        });

        const closeSettings = () => {
            settingsModal.classList.add('hidden');
            settingsProfileMessage.textContent = '';
            settingsPasswordMessage.textContent = '';
            settingsPasswordForm.reset();
        };

        closeSettingsModal.addEventListener('click', closeSettings);
        window.addEventListener('click', (e) => { if (e.target === settingsModal) closeSettings(); });
    }

    // --- Image preview logic for Settings Modal ---
    if (settingsPictureInput) {
        settingsPictureInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    settingsProfileImg.innerHTML = `<img src="${event.target.result}" alt="Profile">`;
                    settingsProfileImg.dataset.tempImage = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // --- Inject Account Deletion Logic ---
        const securityTab = settingsPasswordForm.closest('.settings-tab-content');
        if (securityTab && !document.getElementById('delete-account-btn')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.id = 'delete-account-btn';
            deleteBtn.className = 'btn btn-secondary';
            deleteBtn.style.color = '#EF4444';
            deleteBtn.style.borderColor = '#EF4444';
            deleteBtn.style.marginTop = '30px';
            deleteBtn.style.width = '100%';
            deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete Account';
            
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if(confirm('Are you absolutely sure you want to delete your account? This action cannot be undone and all data will be lost.')) {
                    const user = JSON.parse(localStorage.getItem('analyticaUser'));
                    let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
                    users = users.filter(u => u.username !== user.username);
                    localStorage.setItem('analyticaUsers', JSON.stringify(users));
                    localStorage.removeItem('analyticaUser');
                    window.location.reload();
                }
            });
            securityTab.appendChild(deleteBtn);
        }
    }

    // Settings Tab Switching
    settingsTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-settings-tab');
            settingsTabBtns.forEach(b => b.classList.remove('active'));
            settingsTabContents.forEach(c => c.classList.add('hidden'));
            btn.classList.add('active');
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // Save Settings Profile Logic
    if (settingsProfileForm) {
        settingsProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let user = JSON.parse(localStorage.getItem('analyticaUser'));
            let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
            
            if (user) {
                user.fullName = settingName.value;
                user.age = settingAge.value;
                user.mobile = settingMobile.value;
                user.occupation = settingOccupation.value;
                if (settingCurrency) user.currency = settingCurrency.value;
                user.savingsGoal = settingSavings.value;
                user.expenseGoal = settingExpenseGoal.value;
                if (settingNotifications) user.notificationsEnabled = settingNotifications.checked;
                
                // Save Profile Picture from settings
                if (settingsProfileImg && settingsProfileImg.dataset.tempImage) {
                    user.profilePicture = settingsProfileImg.dataset.tempImage;
                }
                
                localStorage.setItem('analyticaUser', JSON.stringify(user));
                
                const userIndex = users.findIndex(u => u.username === user.username);
                if (userIndex !== -1) {
                    users[userIndex] = {...users[userIndex], ...user};
                    localStorage.setItem('analyticaUsers', JSON.stringify(users));
                }

                setupUI(user); // Update header username immediately
                
                settingsModal.classList.add('hidden');
                showToast('Settings saved successfully!');
                settingsProfileMessage.textContent = '';
            }
        });
    }

    // Change Password Logic
    if (settingsPasswordForm) {
        // Init Last password change label
        const savedTime = localStorage.getItem('analyticaLastPasswordChange');
        if (savedTime && lastPasswordChange) lastPasswordChange.textContent = savedTime;

        settingsPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let user = JSON.parse(localStorage.getItem('analyticaUser'));
            let users = JSON.parse(localStorage.getItem('analyticaUsers')) || [];
            
            if (user.password === currentPasswordInput.value) {
                user.password = newPasswordInput.value;
                localStorage.setItem('analyticaUser', JSON.stringify(user));
                
                const userIndex = users.findIndex(u => u.username === user.username);
                if (userIndex !== -1) {
                    users[userIndex].password = newPasswordInput.value;
                    localStorage.setItem('analyticaUsers', JSON.stringify(users));
                }

                // Update last password change timestamp
                const now = new Date();
                const dateString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
                lastPasswordChange.textContent = dateString;
                localStorage.setItem('analyticaLastPasswordChange', dateString);

                settingsModal.classList.add('hidden');
                showToast('Password updated successfully!');
                settingsPasswordForm.reset();
                settingsPasswordMessage.textContent = '';
            } else {
                settingsPasswordMessage.style.color = '#EF4444';
                settingsPasswordMessage.textContent = 'Current password is incorrect.';
                setTimeout(() => { settingsPasswordMessage.textContent = ''; }, 3000);
            }
        });
    }

    // Global Theme & Language Listeners
    const applyTheme = (theme, isInit = false) => {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        
        // Set Chart defaults dynamically based on theme for maximum visibility
        Chart.defaults.color = isDark ? '#9CA3AF' : '#4B5563';
        Chart.defaults.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        if (!isInit) {
            if (typeof mrrChart !== 'undefined') mrrChart.update();
            if (typeof userSourceChart !== 'undefined') userSourceChart.update();
            if (mainDashboardChart) mainDashboardChart.update();
            if (categoryDoughnutChart) categoryDoughnutChart.update();
        }
    };
    const initialTheme = localStorage.getItem('analyticaTheme') || 'light';
    applyTheme(initialTheme, true);

    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            localStorage.setItem('analyticaTheme', e.target.value);
            applyTheme(e.target.value);
        });
    });

    // --- Feature Card Interactions Logic ---
    const featStuExpense = document.getElementById('feat-stu-expense');
    const featStuSavings = document.getElementById('feat-stu-savings');
    const featStuOverview = document.getElementById('feat-stu-overview');
    const featBusSales = document.getElementById('feat-bus-sales');
    const featBusCrm = document.getElementById('feat-bus-crm');
    const featBusTeam = document.getElementById('feat-bus-team');

    // Since Features are now on the Landing Page, clicking them should prompt sign up
    const handleFeatureClick = () => {
        if (typeof navigateToAuth === 'function') navigateToAuth('signup');
    };

    if (featStuExpense) featStuExpense.addEventListener('click', handleFeatureClick);
    if (featStuSavings) featStuSavings.addEventListener('click', handleFeatureClick);
    if (featStuOverview) featStuOverview.addEventListener('click', handleFeatureClick);
    if (featBusSales) featBusSales.addEventListener('click', handleFeatureClick);
    if (featBusCrm) featBusCrm.addEventListener('click', handleFeatureClick);
    if (featBusTeam) featBusTeam.addEventListener('click', handleFeatureClick);

    const initialLanguage = localStorage.getItem('analyticaLanguage') || 'en';
    if (languageSelect) languageSelect.value = initialLanguage;
    applyLanguage(initialLanguage);

    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem('analyticaLanguage', lang);
            applyLanguage(lang);
        });
    }

    // --- Gatekeeper: Initial Page Load Logic ---
    function initialize() {
        const loggedInUser = JSON.parse(localStorage.getItem('analyticaUser'));
        if (loggedInUser) {
            if (landingView) landingView.classList.add('hidden');
            showAppView(loggedInUser);
        } else {
            if (landingView) landingView.classList.remove('hidden');
            if (authView) authView.classList.add('hidden');
            appView.classList.add('hidden');
        }
    }

    // --- Landing Page Navigation Logic ---
    function navigateToAuth(tabName) {
        landingView.classList.add('hidden');
        authView.classList.remove('hidden');
        const targetTab = document.querySelector(`.auth-tab-link[data-tab="${tabName}"]`);
        if (targetTab) targetTab.click();
    }

    if (navLoginBtn) navLoginBtn.addEventListener('click', () => navigateToAuth('login'));
    if (navSignupBtn) navSignupBtn.addEventListener('click', () => navigateToAuth('signup'));
    if (heroCtaBtn) heroCtaBtn.addEventListener('click', () => navigateToAuth('signup'));

    // --- Smooth Scroll to Top ---
    if (landingLogo) {
        landingLogo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Back to Top Logic ---
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Data Table Sorting Init ---
    if (transactionsTbody) {
        const thead = transactionsTbody.parentElement.querySelector('thead');
        if (thead) {
            const ths = thead.querySelectorAll('th');
            const columns = ['id', 'date', 'type', 'category', 'amount', 'status'];
            ths.forEach((th, index) => {
                if (index < columns.length) {
                    th.classList.add('sortable');
                    th.title = "Click to sort";
                    th.addEventListener('click', () => {
                        const col = columns[index];
                        if (currentSortColumn === col) {
                            currentSortAsc = !currentSortAsc;
                        } else {
                            currentSortColumn = col;
                            currentSortAsc = (col === 'amount'); // defaults
                        }
                        
                        ths.forEach(t => t.innerHTML = t.innerHTML.replace(/( ▲| ▼)/g, ''));
                        th.innerHTML += currentSortAsc ? ' ▲' : ' ▼';
                        
                        const user = JSON.parse(localStorage.getItem('analyticaUser'));
                        if (user) renderTransactions(user);
                    });
                }
            });
        }
    }

    initialize();

    // --- Global Chart.js Defaults (Colors set dynamically in applyTheme) ---
    Chart.defaults.font.family = "'Inter', sans-serif";

    const isDarkInit = document.body.classList.contains('dark-mode');

    // --- Demo Section Charts ---
    const mrrChart = new Chart(document.getElementById('mrrChart'), {
        type: 'line', // Type of chart
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [{
                label: 'MRR ($)',
                data: [12000, 13500, 13000, 15000, 17500, 18000, 21000, 23000],
                backgroundColor: 'rgba(168, 85, 247, 0.2)', // Neon purple area
                borderColor: '#a855f7', // Neon purple line
                borderWidth: 3,
                fill: true, // Fill the area under the line
                tension: 0.4 // Makes the line smooth
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false, // Start y-axis near the data for better visibility
                    ticks: {
                        // Format ticks to show as currency
                        callback: function(value, index, values) {
                            return '$' + value / 1000 + 'k';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Hide the legend as it's self-explanatory
                }
            }
        }
    });

    const userSourceChart = new Chart(document.getElementById('userSourceChart'), {
        type: 'doughnut',
        data: {
            labels: ['Organic Search', 'Direct', 'Referral', 'Social Media'],
            datasets: [{
                label: 'New Users',
                data: [300, 250, 150, 100],
                backgroundColor: [
                    '#a855f7', // Purple
                    '#ec4899', // Pink
                    '#3b82f6', // Blue
                    '#14b8a6'  // Cyan
                ],
                borderColor: isDarkInit ? 'rgba(9, 9, 11, 1)' : '#ffffff',
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        plugins: [window.ChartDataLabels],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: '#f8fafc',
                    font: { weight: 'bold', size: 12 },
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.forEach(data => { sum += data; });
                        if (value === 0 || sum === 0) return null; // Don't show labels for empty slices
                        
                        // Use the slice's animated circumference for a count-up effect
                        const meta = ctx.chart.getDatasetMeta(ctx.datasetIndex);
                        const arc = meta.data[ctx.dataIndex];
                        if (arc && arc.circumference) {
                            const percentage = (arc.circumference / (2 * Math.PI)) * 100;
                            if (percentage < 0.5) return null; // Hide text while the slice is just starting to draw
                            return percentage.toFixed(0) + "%";
                        }
                        
                        return (value * 100 / sum).toFixed(0) + "%"; // Fallback
                    }
                },
                legend: {
                    position: 'bottom', // Position legend at the bottom
                }
            }
        }
    });

    // --- Main Dashboard Charts Initialization ---
    function initializeDashboardCharts() {
        // Prevent re-initialization
        if (dashboardChartsInitialized || !document.getElementById('sparkline1')) return;
        const isDark = document.body.classList.contains('dark-mode');

        const sparklineOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } },
            elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } }
        };

        new Chart(document.getElementById('sparkline1'), { type: 'line', data: { labels: [1,2,3,4,5,6,7], datasets: [{ data: [12,19,15,25,22,30,28], borderColor: '#a855f7' }] }, options: sparklineOptions });
        new Chart(document.getElementById('sparkline2'), { type: 'line', data: { labels: [1,2,3,4,5,6,7], datasets: [{ data: [5,12,8,15,20,18,25], borderColor: '#ec4899' }] }, options: sparklineOptions });
        new Chart(document.getElementById('sparkline3'), { type: 'line', data: { labels: [1,2,3,4,5,6,7], datasets: [{ data: [2.5,2.8,3.0,3.1,3.2,3.1,3.24], borderColor: '#3b82f6' }] }, options: sparklineOptions });
        new Chart(document.getElementById('sparkline4'), { type: 'line', data: { labels: [1,2,3,4,5,6,7], datasets: [{ data: [45,44,43,44,42.5,42.2,42.1], borderColor: '#14b8a6' }] }, options: sparklineOptions });

        mainDashboardChart = new Chart(document.getElementById('revenueGrowthChart'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    { 
                        label: 'Revenue', 
                        data: [65000, 59000, 80000, 81000, 56000, 95000, 110000, 105000, 120000, 124500, 130000, 142000], 
                        borderColor: '#a855f7', 
                        backgroundColor: (context) => {
                            if (!context.chart.chartArea) return 'transparent';
                            const { ctx, chartArea: { top, bottom } } = context.chart;
                            const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                            gradient.addColorStop(0, 'rgba(168, 85, 247, 0.6)');
                            gradient.addColorStop(1, 'rgba(168, 85, 247, 0.0)');
                            return gradient;
                        }, 
                        borderWidth: 3, 
                        fill: true, 
                        tension: 0.4,
                        pointBackgroundColor: isDark ? '#09090b' : '#ffffff',
                        pointBorderColor: '#a855f7',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: '#a855f7',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2
                    },
                    { 
                        label: 'Growth', 
                        data: [28000, 48000, 40000, 19000, 86000, 27000, 90000, 85000, 75000, 95000, 102000, 115000], 
                        borderColor: '#ec4899', 
                        borderWidth: 3, 
                        backgroundColor: (context) => {
                            if (!context.chart.chartArea) return 'transparent';
                            const { ctx, chartArea: { top, bottom } } = context.chart;
                            const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                            gradient.addColorStop(0, 'rgba(236, 72, 153, 0.6)');
                            gradient.addColorStop(1, 'rgba(236, 72, 153, 0.0)');
                            return gradient;
                        }, 
                        fill: true, 
                        tension: 0.4,
                        pointBackgroundColor: '#09090b',
                        pointBorderColor: '#ec4899',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: '#ec4899',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: { 
                    tooltip: { 
                        padding: 15,
                        backgroundColor: isDark ? 'rgba(9, 9, 11, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        titleColor: isDark ? '#f8fafc' : '#111827',
                        bodyColor: isDark ? '#94a3b8' : '#4B5563',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        usePointStyle: true,
                        boxPadding: 6
                    },
                    legend: {
                        display: false // Hide default legend to use custom HTML legend
                    }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { padding: 10 } },
                    y: { grid: { drawBorder: false }, ticks: { padding: 10 } }
                }
            }
        });

        categoryDoughnutChart = new Chart(document.getElementById('trafficSourcesChart'), {
            type: 'doughnut',
            data: {
                labels: ['Food & Dining', 'Transportation', 'Housing', 'Utilities', 'Entertainment', 'Other'],
                datasets: [{
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: ['#a855f7', '#ec4899', '#3b82f6', '#14b8a6', '#f59e0b', '#6366f1'],
                    borderWidth: 2, borderColor: isDark ? 'rgba(9, 9, 11, 1)' : '#ffffff', hoverOffset: 4
                }]
            },
            plugins: [window.ChartDataLabels],
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    datalabels: {
                        color: '#f8fafc',
                        font: { weight: 'bold', size: 12 },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.forEach(data => { sum += data; });
                            if (sum === 0 || value === 0) return null; // Hide 0% or empty charts
                            
                            // Use the slice's animated circumference for a count-up effect
                            const meta = ctx.chart.getDatasetMeta(ctx.datasetIndex);
                            const arc = meta.data[ctx.dataIndex];
                            if (arc && arc.circumference) {
                                const percentage = (arc.circumference / (2 * Math.PI)) * 100;
                                if (percentage < 0.5) return null; // Hide text while the slice is just starting to draw
                                return percentage.toFixed(1) + "%";
                            }
                            
                            return (value * 100 / sum).toFixed(1) + "%"; // Fallback
                        }
                    },
                    legend: { 
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: isDark ? 'rgba(9, 9, 11, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        titleColor: isDark ? '#f8fafc' : '#111827',
                        bodyColor: isDark ? '#94a3b8' : '#4B5563',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        usePointStyle: true,
                        boxPadding: 6
                    }
                }, 
                cutout: '70%',
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const chart = elements[0].element.$context.chart;
                        const index = elements[0].index;
                        const label = chart.data.labels[index];
                        const searchInput = document.querySelector('.search-bar input');
                        if (searchInput) {
                            searchInput.value = label;
                            searchInput.dispatchEvent(new Event('input')); // Triggers the global search filter
                            
                            const tableElement = document.querySelector('.table-box');
                            if (tableElement) tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }
            }
        });

        dashboardChartsInitialized = true;
    }

    // --- Sidebar Active State Logic ---
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (href === '#dashboard') {
                e.preventDefault();
                sidebarLinks.forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Ensure Dashboard is visible
                const dashboardView = document.getElementById('dashboard');
                if (dashboardView) dashboardView.classList.remove('hidden');
            }
        });
    });

    // --- Scroll Animation Logic ---
    // Select all elements that should be animated on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        // Loop over the entries
        entries.forEach(entry => {
            // If the element is visible
            if (entry.isIntersecting) {
                // By wrapping the class addition in requestAnimationFrame, we ensure that
                // the browser has processed any display changes (e.g., from 'none' to 'grid')
                // before the transition-triggering class is added. This fixes the issue
                // where dynamic content appears instantly without animating.
                requestAnimationFrame(() => {
                    entry.target.classList.add('is-visible');
                });
                // Stop observing the element so the animation only happens once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is in the viewport
    });

    // Observe each of the selected elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Enhanced "Live" Chart Updates ---
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currentMonthIndex = 7; // Starting from 'Aug'

    function updateCharts() {
        // Pause animations if the landing page is hidden to save CPU
        if (landingView && landingView.classList.contains('hidden')) return;

        // --- Update MRR Line Chart ---
        const mrrData = mrrChart.data.datasets[0].data;
        const lastMrrValue = mrrData[mrrData.length - 1];
        
        // Simulate new MRR data (last value +/- a random amount)
        const newMrrValue = lastMrrValue + (Math.random() * 2000 - 800);

        // Add new data point and remove the oldest
        mrrData.push(newMrrValue);
        mrrData.shift();

        // Update labels
        currentMonthIndex = (currentMonthIndex + 1) % 12;
        const newLabel = monthNames[currentMonthIndex];
        mrrChart.data.labels.push(newLabel);
        mrrChart.data.labels.shift();

        // --- Update User Source Doughnut Chart ---
        const userSourceData = userSourceChart.data.datasets[0].data;

        // Randomly adjust two sources to keep the total relatively stable
        const source1Index = Math.floor(Math.random() * userSourceData.length);
        let source2Index = Math.floor(Math.random() * userSourceData.length);
        while (source1Index === source2Index) {
            source2Index = Math.floor(Math.random() * userSourceData.length);
        }

        const change = Math.floor(Math.random() * 20);
        
        if (userSourceData[source1Index] > change) {
            userSourceData[source1Index] -= change;
            userSourceData[source2Index] += change;
        }

        // Update the charts with a smooth animation
        mrrChart.update();
        userSourceChart.update();
    }

    // Set an interval to update the charts every 3 seconds (3000ms)
    setInterval(updateCharts, 3000);

});
