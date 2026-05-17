import React, { useState, useContext, useEffect } from 'react';
import { 
  ActivityIndicator, 
  Alert, 
  Dimensions, 
  FlatList, 
  Image, 
  KeyboardAvoidingView, 
  Modal, 
  Platform, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- SYSTEM TRANSLATION DICTIONARY ---
const LOCALIZATION = {
  en: {
    title: 'TimeFit Pro',
    subTitle: 'Premium Biometric Digital Guardrails',
    signIn: 'Sign In With Email',
    signUp: 'Create Secure Account',
    orContinue: 'Or continue with premium providers',
    onboardTitle: 'Launch Bootstrapping Sequence',
    onboardDesc: 'Configure your primary runtime threshold profile parameters to engage the tracking shield:',
    targetApp: 'SELECT TARGET APP CONTAINER:',
    maxMinutes: 'MAX RUNTIME ALLOWED (MINUTES):',
    activate: 'Activate Framework Shield',
    testingConsole: 'INTEGRATED TESTING LAYER',
    testingDesc: 'Simulate opening native app containers to test real-time intercepts:',
    monitoredApps: 'Monitored Containers',
    historyTitle: 'Kinematic Audit Logs',
    historySub: 'Biometric Activity Ledger',
    settingsTitle: 'System Preferences',
    darkMode: 'High Contrast Dark Mode',
    language: 'Global Core Language',
    logout: 'Terminate Session Thread',
    lockoutTitle: 'LIMIT EXCEEDED',
    lockoutDesc: 'Runtime tokens for this container have expired. Physical exercise verification required to unlock.',
    beginChallenge: 'Initialize Bypass Challenge',
    selectExercise: 'Select Bypass Activity',
    exerciseDesc: 'Choose your preferred activity to compute an authorization key:',
    launchCamera: 'Launch Biometric Capture Core',
    cameraDesc: 'Perform reps inside viewport constraints',
    applyToken: 'Inject Bypass Token'
  },
  es: {
    title: 'TimeFit Pro',
    subTitle: 'Líneas de Salvaguarda Digital Biométrica',
    signIn: 'Iniciar Sesión con Email',
    signUp: 'Crear Cuenta Segura',
    orContinue: 'O continuar con proveedores premium',
    onboardTitle: 'Secuencia de Inicialización',
    onboardDesc: 'Configure los parámetros iniciales para activar el escudo de protección:',
    targetApp: 'SELECCIONAR APLICACIÓN OBJETIVO:',
    maxMinutes: 'TIEMPO MÁXIMO PERMITIDO (MINUTOS):',
    activate: 'Activar Escudo del Sistema',
    testingConsole: 'CAPA DE PRUEBAS INTEGRADA',
    testingDesc: 'Simule abrir contenedores de aplicaciones para probar intercepciones:',
    monitoredApps: 'Contenedores Monitoreados',
    historyTitle: 'Registro de Auditoría Cinemática',
    historySub: 'Historial de Actividad Biométrica',
    settingsTitle: 'Preferencias del Sistema',
    darkMode: 'Modo Oscuro de Alto Contraste',
    language: 'Idioma Global del Sistema',
    logout: 'Terminar Sesión del Sistema',
    lockoutTitle: 'LÍMITE EXCEDIDO',
    lockoutDesc: 'Los tokens de tiempo han expirado. Se requiere verificación física para desbloquear.',
    beginChallenge: 'Iniciar Desafío de Desbloqueo',
    selectExercise: 'Seleccionar Actividad de Desbloqueo',
    exerciseDesc: 'Elija su actividad física preferida para generar una clave de autorización:',
    launchCamera: 'Iniciar Captura Biométrica',
    cameraDesc: 'Realice las repeticiones dentro del campo visual de la cámara',
    applyToken: 'Inyectar Token de Acceso'
  },
  fr: {
    title: 'TimeFit Pro',
    subTitle: 'Garde-fous Numériques Biométriques',
    signIn: 'Se Connecter par Email',
    signUp: 'Créer un Compte Sécurisé',
    orContinue: 'Ou continuer avec des fournisseurs premium',
    onboardTitle: 'Séquence d\'Initialisation',
    onboardDesc: 'Configurez vos paramètres initiaux pour activer le bouclier de suivi:',
    targetApp: 'SÉLECTIONNER L\'APPLICATION CIBLE:',
    maxMinutes: 'TEMPS MAXIMUM AUTORISÉ (MINUTES):',
    activate: 'Activer le Bouclier Système',
    testingConsole: 'COUCHE DE TEST INTÉGRÉE',
    testingDesc: 'Simuler l\'ouverture d\'applications pour tester les interceptions:',
    monitoredApps: 'Conteneurs Surveillés',
    historyTitle: 'Journal d\'Audit Cinématique',
    historySub: 'Registre des Activités Biométriques',
    settingsTitle: 'Préférences Système',
    darkMode: 'Modo Sombre Haute Performance',
    language: 'Langue Globale du Système',
    logout: 'Terminer la Session Unique',
    lockoutTitle: 'LIMITE DÉPASSÉE',
    lockoutDesc: 'Les jetons de temps ont expiré. Vérification physique requise pour déverrouiller l\'accès.',
    beginChallenge: 'Initialiser le Défi de Déblocage',
    selectExercise: 'Sélectionner l\'Activité de Déblocage',
    exerciseDesc: 'Choisissez votre activité préférée pour calculer une clé d\'autorisation:',
    launchCamera: 'Lancer la Capture Biométrique',
    cameraDesc: 'Effectuez les répétitions dans les limites de la caméra',
    applyToken: 'Injecter le Jeton d\'Accès'
  }
};

// --- PALETTE MATRIX DESIGN SYSTEM ---
const PALETTES = {
  light: {
    primary: '#1e1b4b',
    accent: '#8b5cf6',
    success: '#10b981',
    critical: '#ef4444',
    background: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    textWhite: '#ffffff',
    statusBar: 'dark-content'
  },
  dark: {
    primary: '#090514',
    accent: '#a78bfa',
    success: '#34d399',
    critical: '#f87171',
    background: '#020205',
    surface: '#0d0b18',
    border: '#231e38',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    textWhite: '#ffffff',
    statusBar: 'light-content'
  }
};

const ThemeContext = React.createContext();
const AppDataContext = React.createContext();
const AuthContext = React.createContext();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AVAILABLE_APPS = [
  { id: 'tiktok', name: 'TikTok', icon: 'music-note', color: '#010101', bgColor: '#a78bfa' },
  { id: 'instagram', name: 'Instagram', icon: 'photo-camera', color: '#FFFFFF', bgColor: '#ec4899' },
  { id: 'youtube', name: 'YouTube', icon: 'play-circle-filled', color: '#FFFFFF', bgColor: '#ef4444' },
];

const EXERCISE_OPTIONS = [
  { id: 'squats', name: 'Bodyweight Squats', icon: 'accessibility-new', count: 10, reward: 15 },
  { id: 'pushups', name: 'Standard Push-Ups', icon: 'fitness-center', count: 12, reward: 20 },
  { id: 'jacks', name: 'Jumping Jacks', icon: 'directions-run', count: 20, reward: 15 }
];

// --- APP DATA STATE CONTAINER ---
export const AppDataProvider = function(props) {
  const [limits, setLimits] = useState([{ id: 'l1', app_id: 'tiktok', app_name: 'TikTok', daily_limit_minutes: 10, bonus_minutes: 0 }]);
  const [usage, setUsage] = useState([{ id: 'u1', app_limit_id: 'l1', used_minutes: 8 }]);
  const [exercises, setExercises] = useState([{ id: 'ex1', type: 'Bodyweight Squats', count: 10, timestamp: '10:14 AM', tokenEarned: '+15m' }]);
  const [activeAppSimulated, setActiveAppSimulated] = useState('none'); 
  const [isHardLocked, setIsHardLocked] = useState(false); 

  useEffect(() => {
    const monitorInterval = setInterval(() => {
      if (activeAppSimulated !== 'none') {
        const targetLimit = limits.find(l => l.app_id === activeAppSimulated);
        if (targetLimit) {
          const totalAllowed = targetLimit.daily_limit_minutes + targetLimit.bonus_minutes;
          setUsage(prevUsage => prevUsage.map(u => {
            if (u.app_limit_id === targetLimit.id) {
              const currentMinutes = u.used_minutes;
              if (currentMinutes >= totalAllowed) {
                setIsHardLocked(true); 
                return u;
              }
              return { ...u, used_minutes: currentMinutes + 1 };
            }
            return u;
          }));
        }
      }
    }, 1500);
    return () => clearInterval(monitorInterval);
  }, [activeAppSimulated, limits]);

  const addBonusMinutes = function(appId, amount, exerciseName, exerciseCount) {
    setLimits(prevLimits => prevLimits.map(item => item.app_id === appId ? { ...item, bonus_minutes: item.bonus_minutes + amount } : item));
    setExercises(prev => [{ id: 'ex_' + Date.now(), type: exerciseName, count: exerciseCount, timestamp: 'Just Now', tokenEarned: `+${amount}m` }, ...prev]);
    setIsHardLocked(false); 
  };

  const createNewLimit = function(appId, selectedMinutes) {
    if (limits.some(l => l.app_id === appId)) return false;
    const targetApp = AVAILABLE_APPS.find(a => a.id === appId);
    const newId = `l_${Date.now()}`;
    setLimits(prev => [...prev, { id: newId, app_id: appId, app_name: targetApp.name, daily_limit_minutes: parseInt(selectedMinutes) || 15, bonus_minutes: 0 }]);
    setUsage(prev => [...prev, { id: `u_${Date.now()}`, app_limit_id: newId, used_minutes: 0 }]);
    return true;
  };

  return React.createElement(AppDataContext.Provider, { value: { limits, usage, exercises, addBonusMinutes, createNewLimit, activeAppSimulated, setActiveAppSimulated, isHardLocked, setIsHardLocked } }, props.children);
};

// --- IDENTITY SECURITY PROVIDER ---
const AuthProvider = function(props) {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('en');
  const t = LOCALIZATION[lang];

  return React.createElement(AuthContext.Provider, { 
    value: { user, isLoggedIn: !!user, login: setUser, logout: function() { setUser(null); }, lang, setLang, t } 
  }, props.children);
};

// --- AUTH PLATFORM OVERLAY (SSO READY) ---
var AuthGateScreen = function() {
  const { login, t } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const triggerOAuthMock = function(provider) {
    login({ name: `${provider} Profile`, isNewUser: false });
  };

  return (
    <ScrollView contentContainerStyle={styles.authScrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.authCoreCard}>
        <MaterialIcons name="all-inclusive" size={54} color="#8b5cf6" style={{ alignSelf: 'center', marginBottom: 8 }} />
        <Text style={styles.authTitleText}>{isSignUp ? t.signUp : t.signIn}</Text>
        <Text style={styles.authSubText}>{t.subTitle}</Text>

        {isSignUp && (
          <TextInput placeholder="Username Token" placeholderTextColor="#64748b" value={username} onChangeText={setUsername} style={styles.authInputField} />
        )}
        <TextInput placeholder="Identity Email" placeholderTextColor="#64748b" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.authInputField} />
        <TextInput placeholder="Security Key" placeholderTextColor="#64748b" value={password} onChangeText={setPassword} secureTextEntry style={styles.authInputField} />

        <TouchableOpacity onPress={() => login({ name: isSignUp ? username || 'New Pro' : email.split('@')[0] || 'Executive', isNewUser: isSignUp })} style={styles.authActionButton}>
          <Text style={styles.authActionButtonText}>{isSignUp ? 'REGISTER SYSTEM PROFILE' : 'AUTHORIZE ACCOUNT LAYER'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={styles.authModeToggleBtn}>
          <Text style={styles.authModeToggleText}>{isSignUp ? 'Have an account? Sign In' : 'New to TimeFit? Create Account'}</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t.orContinue}</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* SOCIAL LINK PROVIDER LOGIC */}
        <View style={styles.oauthButtonRowStack}>
          <TouchableOpacity onPress={() => triggerOAuthMock('Google')} style={[styles.oauthCircleIconBtn, { backgroundColor: '#ea4335' }]}>
            <MaterialIcons name="g-mobiledata" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => triggerOAuthMock('Apple')} style={[styles.oauthCircleIconBtn, { backgroundColor: '#000000' }]}>
            <MaterialIcons name="apple" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => triggerOAuthMock('Facebook')} style={[styles.oauthCircleIconBtn, { backgroundColor: '#1877f2' }]}>
            <MaterialIcons name="facebook" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => triggerOAuthMock('X')} style={[styles.oauthCircleIconBtn, { backgroundColor: '#14171A' }]}>
            <Text style={styles.oauthTextBrandInline}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => triggerOAuthMock('LinkedIn')} style={[styles.oauthCircleIconBtn, { backgroundColor: '#0077b5' }]}>
            <Text style={styles.oauthTextBrandInline}>in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// --- INITIAL CONTEXT SETTING ONBOARDING ---
var OnboardingSetupScreen = function(props) {
  const { t } = useContext(AuthContext);
  const dataCtx = useContext(AppDataContext);
  const [targetApp, setTargetApp] = useState('tiktok');
  const [minutes, setMinutes] = useState('15');

  return (
    <View style={styles.onboardWrapper}>
      <Text style={styles.onboardHeaderTitle}>{t.onboardTitle}</Text>
      <Text style={styles.onboardDescriptor}>{t.onboardDesc}</Text>
      
      <Text style={styles.microFormLabel}>{t.targetApp}</Text>
      <View style={styles.horizontalSelectorContainer}>
        {AVAILABLE_APPS.map(app => (
          <TouchableOpacity key={app.id} onPress={() => setTargetApp(app.id)} style={[styles.flexSelectionBadge, targetApp === app.id ? styles.badgeSelectedPurple : styles.badgeInactiveSlate]}>
            <Text style={[styles.badgeTextLayout, targetApp === app.id ? styles.textWhiteLayout : styles.textSlateLayout]}>{app.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.microFormLabel}>{t.maxMinutes}</Text>
      <TextInput value={minutes} onChangeText={setMinutes} keyboardType="number-pad" style={styles.standaloneInputTextLine} />

      <TouchableOpacity onPress={() => { dataCtx.createNewLimit(targetApp, minutes); props.onComplete(); }} style={styles.primaryActionButtonBlock}>
        <Text style={styles.actionBtnTextLine}>{t.activate}</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- HOOK LAYOUT views ---
var HomeScreen = function(props) {
  const navigation = props.navigation;
  const insets = useSafeAreaInsets();
  const dataCtx = useContext(AppDataContext);
  const { currentColors } = useContext(ThemeContext);
  const { t } = useContext(AuthContext);

  return (
    <View style={[styles.fullContainer, { backgroundColor: currentColors.background }]}>
      <View style={[styles.masterHeaderBanner, { backgroundColor: currentColors.primary, height: 64 + insets.top, paddingTop: insets.top }]}>
        <Text style={styles.headerTitleString}>{t.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddLimitModal')}>
          <MaterialIcons name="add-box" size={26} color={currentColors.accent} />
        </TouchableOpacity>
      </View>

      <Modal visible={dataCtx.isHardLocked} animationType="slide" transparent={false}>
        <View style={[styles.lockoutOverlayWindow, { backgroundColor: currentColors.primary }]}>
          <MaterialIcons name="lock-clock" size={80} color={currentColors.textWhite} />
          <Text style={styles.lockoutTitleHeader}>{t.lockoutTitle}</Text>
          <Text style={styles.lockoutSubHeader}>{t.lockoutDesc}</Text>
          <TouchableOpacity onPress={() => {
            const cachedApp = dataCtx.activeAppSimulated;
            dataCtx.setIsHardLocked(false);
            dataCtx.setActiveAppSimulated('none');
            navigation.navigate('ExerciseChallenge', { targetAppId: cachedApp });
          }} style={[styles.lockoutActionBtn, { backgroundColor: currentColors.accent }]}>
            <Text style={styles.lockoutActionBtnText}>{t.beginChallenge}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={[styles.telemetryCardUnit, { backgroundColor: currentColors.surface, borderColor: currentColors.border, borderWidth: 1 }]}>
          <Text style={[styles.telemetryTitleLabel, { color: currentColors.accent }]}>{t.testingConsole}</Text>
          <Text style={[styles.telemetryBodyContext, { color: currentColors.textSecondary }]}>{t.testingDesc}</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            {AVAILABLE_APPS.map(app => {
              const isOpen = dataCtx.activeAppSimulated === app.id;
              return (
                <TouchableOpacity key={app.id} onPress={() => dataCtx.setActiveAppSimulated(isOpen ? 'none' : app.id)} style={[styles.appTestingBadge, { backgroundColor: isOpen ? currentColors.accent : currentColors.primary }]}>
                  <Text style={styles.appTestingBadgeText}>{isOpen ? `Stop ${app.name}` : `Run ${app.name}`}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text style={[styles.sectionTitleHeaderBlock, { color: currentColors.textPrimary }]}>{t.monitoredApps}</Text>
        {dataCtx.limits.map(limit => {
          const usageObj = dataCtx.usage.find(u => u.app_limit_id === limit.id) || { used_minutes: 0 };
          const allowed = limit.daily_limit_minutes + limit.bonus_minutes;
          const ratio = allowed > 0 ? usageObj.used_minutes / allowed : 0;
          return (
            <View key={limit.id} style={[styles.renderedLimitCard, { backgroundColor: currentColors.surface, borderColor: currentColors.border }]}>
              <Text style={[styles.renderedCardTitle, { color: currentColors.textPrimary }]}>{limit.app_name}</Text>
              <Text style={[styles.renderedCardSub, { color: currentColors.textSecondary }]}>{usageObj.used_minutes}m / {allowed}m total</Text>
              <View style={styles.progressBarWrapperTrack}>
                <View style={[styles.progressBarFilledInner, { width: `${Math.min(ratio, 1) * 100}%`, backgroundColor: ratio >= 1 ? currentColors.critical : currentColors.accent }]} />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

var ExercisesScreen = function() {
  const dataCtx = useContext(AppDataContext);
  const { currentColors } = useContext(ThemeContext);
  const { t } = useContext(AuthContext);
  return (
    <View style={[styles.fullContainer, { backgroundColor: currentColors.background }]}>
      <View style={[styles.subHeaderBannerDecoration, { backgroundColor: currentColors.primary }]}>
        <Text style={styles.subHeaderTitleString}>{t.historyTitle}</Text>
      </View>
      <FlatList 
        data={dataCtx.exercises}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.historyAuditCard, { backgroundColor: currentColors.surface, borderColor: currentColors.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <MaterialIcons name="offline-bolt" size={24} color={currentColors.accent} />
              <View>
                <Text style={[styles.historyAuditTitle, { color: currentColors.textPrimary }]}>{item.count} {item.type}</Text>
                <Text style={[styles.historyAuditTime, { color: currentColors.textSecondary }]}>{item.timestamp} • {t.historySub}</Text>
              </View>
            </View>
            <Text style={[styles.historyAuditBadge, { backgroundColor: currentColors.border, color: currentColors.accent }]}>{item.tokenEarned}</Text>
          </View>
        )}
      />
    </View>
  );
};

var AccountScreen = function() {
  const { logout, lang, setLang, t } = useContext(AuthContext);
  const { isDarkMode, toggleTheme, currentColors } = useContext(ThemeContext);

  return (
    <View style={[styles.fullContainer, { backgroundColor: currentColors.background }]}>
      <View style={[styles.subHeaderBannerDecoration, { backgroundColor: currentColors.primary }]}>
        <Text style={styles.subHeaderTitleString}>{t.settingsTitle}</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={[styles.settingsPanelBox, { backgroundColor: currentColors.surface, borderColor: currentColors.border }]}>
          
          <View style={styles.settingsFlexRowLine}>
            <Text style={[styles.settingsLabelString, { color: currentColors.textPrimary }]}>{t.darkMode}</Text>
            <TouchableOpacity onPress={toggleTheme} style={[styles.themeToggleButtonFrame, { backgroundColor: isDarkMode ? currentColors.accent : currentColors.border }]}>
              <Text style={styles.themeToggleTextString}>{isDarkMode ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.settingsFlexRowLine, { flexDirection: 'column', alignItems: 'flex-start', gap: 12 }]}>
            <Text style={[styles.settingsLabelString, { color: currentColors.textPrimary }]}>{t.language}</Text>
            <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
              {['en', 'es', 'fr'].map(l => (
                <TouchableOpacity key={l} onPress={() => setLang(l)} style={[styles.langSelectMiniBtn, { backgroundColor: lang === l ? currentColors.accent : currentColors.border, flex: 1 }]}>
                  <Text style={{ color: lang === l ? '#fff' : currentColors.textPrimary, fontWeight: '800', textAlign: 'center', fontSize: 12 }}>{l.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={logout} style={styles.systemLogoutActionBtn}>
          <Text style={styles.systemLogoutActionBtnText}>{t.logout}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

var AddLimitScreen = function(props) {
  const navigation = props.navigation;
  const dataCtx = useContext(AppDataContext);
  const [appId, setAppId] = useState('tiktok');
  const [minutes, setMinutes] = useState('15');

  return (
    <View style={styles.modalContentWrapper}>
      <Text style={styles.modalTitleText}>Inject System Rule Hook</Text>
      <View style={{ gap: 8, marginVertical: 16, flexDirection: 'row' }}>
        {AVAILABLE_APPS.map(app => (
          <TouchableOpacity key={app.id} onPress={() => setAppId(app.id)} style={[styles.flexSelectionBadge, appId === app.id ? styles.badgeSelectedPurple : styles.badgeInactiveSlate]}>
            <Text style={[styles.badgeTextLayout, appId === app.id ? styles.textWhiteLayout : styles.textSlateLayout]}>{app.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput value={minutes} onChangeText={setMinutes} keyboardType="number-pad" style={styles.standaloneInputTextLineModal} />
      <TouchableOpacity onPress={() => { dataCtx.createNewLimit(appId, minutes); navigation.goBack(); }} style={styles.primaryActionButtonBlock}><Text style={styles.actionBtnTextLine}>Commit Hook</Text></TouchableOpacity>
    </View>
  );
};

var ExerciseChallengeScreen = function(props) {
  const navigation = props.navigation;
  const { t } = useContext(AuthContext);
  const targetAppId = props.route.params?.targetAppId || 'tiktok';
  const [selectedExercise, setSelectedExercise] = useState(EXERCISE_OPTIONS[0]);

  return (
    <View style={styles.challengeViewLayoutOuter}>
      <Text style={styles.challengeTitleHeaderMain}>{t.selectExercise}</Text>
      <Text style={styles.challengeParagraphBody}>{t.exerciseDesc}</Text>
      <View style={{ gap: 12, marginVertical: 20 }}>
        {EXERCISE_OPTIONS.map(ex => (
          <TouchableOpacity key={ex.id} onPress={() => setSelectedExercise(ex)} style={[styles.exerciseOptionRowCard, selectedExercise.id === ex.id ? styles.exerciseRowCardActivePurple : styles.exerciseRowCardInactiveSlate]}>
            <Text style={styles.textWhiteLayout}>{ex.name} ({ex.count} reps)</Text>
            <Text style={{ color: '#10b981', fontWeight: '900' }}>+{ex.reward}m</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('CameraVerification', { targetAppId, exercise: selectedExercise })} style={styles.challengeSubmitActionButtonBlock}>
        <Text style={styles.challengeSubmitBtnTextLine}>{t.launchCamera}</Text>
      </TouchableOpacity>
    </View>
  );
};

var CameraVerificationScreen = function(props) {
  const navigation = props.navigation;
  const dataCtx = useContext(AppDataContext);
  const { t } = useContext(AuthContext);
  const targetAppId = props.route.params?.targetAppId || 'tiktok';
  const exerciseSelected = props.route.params?.exercise || EXERCISE_OPTIONS[0];

  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <View style={styles.cameraBlackWindowBox}>
      <View style={styles.cameraViewportContainerArea}>
        {!done ? (
          <View style={{ alignItems: 'center' }}>
            <MaterialIcons name="center-focus-weak" size={64} color="#ffffff" />
            <Text style={styles.cameraCenterInstructionText}>{t.cameraDesc}</Text>
            {processing && <ActivityIndicator size="large" color="#34d399" style={{ marginTop: 16 }} />}
          </View>
        ) : (
          <Text style={styles.cameraCenterSuccessText}>Verification Key Computed</Text>
        )}
      </View>
      <View style={styles.cameraLowerDeckPanel}>
        {!done ? (
          <TouchableOpacity onPress={() => { setProcessing(true); setTimeout(() => { setProcessing(false); setDone(true); }, 1500); }} style={styles.cameraCaptureButtonShutterRing} />
        ) : (
          <TouchableOpacity onPress={() => { dataCtx.addBonusMinutes(targetAppId, exerciseSelected.reward, exerciseSelected.name, exerciseSelected.count); navigation.popToTop(); }} style={styles.cameraCommitRewardActionButton}>
            <Text style={styles.cameraCommitBtnTextLine}>{t.applyToken}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// --- CORE MENU TAB BAR HOOK ---
var BottomTabDeck = function() {
  const { currentColors } = useContext(ThemeContext);
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: currentColors.accent,
      tabBarInactiveTintColor: currentColors.textSecondary,
      tabBarStyle: { backgroundColor: currentColors.primary, borderTopWidth: 0, height: 62, paddingBottom: 8 },
      tabBarIcon: ({ color, size }) => {
        let name = 'dashboard';
        if (route.name === 'Home') name = 'dashboard';
        else if (route.name === 'Exercises') name = 'fitness-center';
        else if (route.name === 'Account') name = 'settings';
        return <MaterialIcons name={name} size={size} color={color} />;
      }
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Exercises" component={ExercisesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

var StructuralNavigationTree = function() {
  const authCtx = useContext(AuthContext);
  const [onboarded, setOnboarded] = useState(false);

  if (!authCtx.isLoggedIn) {
    return <Stack.Navigator screenOptions={{ headerShown: false }}><Stack.Screen name="Auth" component={AuthGateScreen} /></Stack.Navigator>;
  }
  if (authCtx.user?.isNewUser && !onboarded) {
    return <OnboardingSetupScreen onComplete={() => setOnboarded(true)} />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainHub" component={BottomTabDeck} />
      <Stack.Screen name="AddLimitModal" component={AddLimitScreen} />
      <Stack.Screen name="ExerciseChallenge" component={ExerciseChallengeScreen} />
      <Stack.Screen name="CameraVerification" component={CameraVerificationScreen} />
    </Stack.Navigator>
  );
};

// --- GRAPH STYLE ARCHITECTURES ---
const styles = StyleSheet.create({
  authScrollContainer: { flexGrow: 1, backgroundColor: '#090514', justifyContent: 'center', padding: 20 },
  authCoreCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 24 },
  authTitleText: { fontSize: 22, fontWeight: '900', color: '#1e1b4b', textAlign: 'center' },
  authSubText: { fontSize: 12, color: '#64748b', textAlign: 'center', marginBottom: 20, marginTop: 4 },
  authInputField: { backgroundColor: '#f1f5f9', padding: 14, borderRadius: 12, marginBottom: 10, color: '#0f172a', fontWeight: '600' },
  authActionButton: { backgroundColor: '#8b5cf6', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  authActionButtonText: { color: '#ffffff', fontWeight: '800', fontSize: 13 },
  authModeToggleBtn: { alignSelf: 'center', marginTop: 12 },
  authModeToggleText: { color: '#8b5cf6', fontWeight: '700', fontSize: 12 },
  
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  dividerText: { marginHorizontal: 10, fontSize: 11, color: '#94a3b8', fontWeight: '700' },
  
  oauthButtonRowStack: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  oauthCircleIconBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  oauthTextBrandInline: { color: '#ffffff', fontWeight: '900', fontSize: 16 },

  onboardWrapper: { flex: 1, backgroundColor: '#090514', padding: 24, justifyContent: 'center' },
  onboardHeaderTitle: { fontSize: 24, fontWeight: '900', color: '#ffffff', marginBottom: 6 },
  onboardDescriptor: { color: '#a78bfa', fontSize: 13, lineHeight: 20, marginBottom: 24 },
  microFormLabel: { fontSize: 11, fontWeight: '800', color: '#94a3b8', marginBottom: 10 },
  horizontalSelectorContainer: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  flexSelectionBadge: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1 },
  badgeSelectedPurple: { backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' },
  badgeInactiveSlate: { backgroundColor: 'transparent', borderColor: '#334155' },
  badgeTextLayout: { fontWeight: '700', fontSize: 12 },
  textWhiteLayout: { color: '#ffffff' },
  textSlateLayout: { color: '#94a3b8' },
  standaloneInputTextLine: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: '#334155', borderRadius: 12, padding: 14, color: '#ffffff', fontSize: 15, fontWeight: '700', marginBottom: 24 },
  standaloneInputTextLineModal: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, padding: 14, color: '#000', fontSize: 15, fontWeight: '700', marginBottom: 24 },
  primaryActionButtonBlock: { backgroundColor: '#8b5cf6', padding: 14, borderRadius: 12, alignItems: 'center' },
  actionBtnTextLine: { color: '#ffffff', fontWeight: '800', fontSize: 14 },

  fullContainer: { flex: 1 },
  masterHeaderBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  headerTitleString: { color: '#ffffff', fontSize: 18, fontWeight: '900' },
  subHeaderBannerDecoration: { padding: 20, paddingTop: 48 },
  subHeaderTitleString: { color: '#ffffff', fontSize: 18, fontWeight: '900' },

  lockoutOverlayWindow: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  lockoutTitleHeader: { color: '#ffffff', fontSize: 28, fontWeight: '900', marginTop: 12 },
  lockoutSubHeader: { color: '#94a3b8', textAlign: 'center', marginVertical: 12, fontSize: 14 },
  lockoutActionBtn: { padding: 14, borderRadius: 12, width: '100%', alignItems: 'center' },
  lockoutActionBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 14 },

  telemetryCardUnit: { padding: 14, borderRadius: 16, marginBottom: 20 },
  telemetryTitleLabel: { fontSize: 11, fontWeight: '900' },
  telemetryBodyContext: { fontSize: 12, marginTop: 2 },
  appTestingBadge: { padding: 10, borderRadius: 8, flex: 1, alignItems: 'center' },
  appTestingBadgeText: { color: '#ffffff', fontSize: 11, fontWeight: '700' },

  sectionTitleHeaderBlock: { fontSize: 15, fontWeight: '800', marginBottom: 10 },
  renderedLimitCard: { padding: 14, borderRadius: 16, borderWidth: 1, marginBottom: 10 },
  renderedCardTitle: { fontSize: 15, fontWeight: '700' },
  renderedCardSub: { fontSize: 12, marginTop: 2, marginBottom: 10 },
  progressBarWrapperTrack: { height: 6, backgroundColor: '#e2e8f0', borderRadius: 3, overflow: 'hidden' },
  progressBarFilledInner: { height: '100%', borderRadius: 3 },

  historyAuditCard: { padding: 14, borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderWidth: 1 },
  historyAuditTitle: { fontWeight: '700', fontSize: 14 },
  historyAuditTime: { fontSize: 11, marginTop: 1 },
  historyAuditBadge: { fontWeight: '800', fontSize: 11, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },

  settingsPanelBox: { width: '100%', borderRadius: 16, borderWidth: 1, padding: 6 },
  settingsFlexRowLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  settingsLabelString: { fontWeight: '600', fontSize: 14 },
  themeToggleButtonFrame: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  themeToggleTextString: { color: '#ffffff', fontWeight: '800', fontSize: 11 },
  langSelectMiniBtn: { padding: 10, borderRadius: 8 },
  systemLogoutActionBtn: { marginTop: 24, alignItems: 'center' },
  systemLogoutActionBtnText: { color: '#ef4444', fontWeight: '700', fontSize: 14 },

  modalContentWrapper: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f8fafc' },
  modalTitleText: { fontSize: 20, fontWeight: '900', color: '#1e1b4b' },

  challengeViewLayoutOuter: { flex: 1, backgroundColor: '#090514', padding: 24, justifyContent: 'center' },
  challengeTitleHeaderMain: { color: '#ffffff', fontSize: 24, fontWeight: '900' },
  challengeParagraphBody: { color: '#94a3b8', fontSize: 13, marginTop: 6, lineHeight: 20 },
  exerciseOptionRowCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 14, borderWidth: 1 },
  exerciseRowCardActivePurple: { backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' },
  exerciseRowCardInactiveSlate: { backgroundColor: '#130f24', borderColor: '#231e38' },
  challengeSubmitActionButtonBlock: { backgroundColor: '#ffffff', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  challengeSubmitBtnTextLine: { color: '#0f172a', fontWeight: '800', fontSize: 14 },

  cameraBlackWindowBox: { flex: 1, backgroundColor: '#000000' },
  cameraViewportContainerArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cameraCenterInstructionText: { color: '#ffffff', marginTop: 12, fontSize: 13, textAlign: 'center', opacity: 0.8 },
  cameraCenterSuccessText: { color: '#ffffff', fontSize: 18, fontWeight: '800' },
  cameraLowerDeckPanel: { height: 120, justifyContent: 'center', alignItems: 'center' },
  cameraCaptureButtonShutterRing: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffffff', borderWidth: 4, borderColor: '#475569' },
  cameraCommitRewardActionButton: { backgroundColor: '#10b981', padding: 14, borderRadius: 12, width: '80%', alignItems: 'center' },
  cameraCommitBtnTextLine: { color: '#ffffff', fontWeight: '800', fontSize: 14 }
});

// --- MAIN RUNTIME CONTAINER LAYER ---
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const currentColors = isDarkMode ? PALETTES.dark : PALETTES.light;

  const toggleTheme = function() {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentColors }}>
        <StatusBar barStyle={currentColors.statusBar} />
        <AuthProvider>
          <AppDataProvider>
            <NavigationContainer>
              <StructuralNavigationTree />
            </NavigationContainer>
          </AppDataProvider>
        </AuthProvider>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}