import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  ScrollView,
  Dimensions,
  Appearance
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// --- THEME DEFINITIONS WITH LIQUID GLASS MORPHISM ---
// Replaces previous space styles with premium dynamic iOS glass surfaces 
// utilizing deep glossy gradients, translucent overlays, and bright highlight blurs.
const LIGHT_COLORS = {
  bg: '#E2F1E8',          // Fresh minty fluid light canvas base
  glassBg: 'rgba(255, 255, 255, 0.45)', // Premium Apple-grade liquid translucent glass
  glassBorder: 'rgba(255, 255, 255, 0.6)', // Bright gloss reflection rim highlight
  textMain: '#1C1C1E',    // iOS System Dark text
  textSub: '#6E6E73',     // Apple secondary label gray
  primary: '#34C759',     // Native iOS Fluid Emerald Green
  primaryTint: 'rgba(52, 199, 89, 0.12)', // Subtle green fluid tracking background
  accent: '#007AFF',      // System Blue utility
  border: 'rgba(0, 0, 0, 0.05)',
  inputBg: 'rgba(255, 255, 255, 0.6)'
};

const DARK_COLORS = {
  bg: '#0A0E1A',          // Deep premium oceanic obsidian backdrop
  glassBg: 'rgba(28, 28, 30, 0.55)', // Dark frosted liquid premium glass canvas
  glassBorder: 'rgba(255, 255, 255, 0.12)', // Glossy star-lit highlight reflection border
  textMain: '#FFFFFF',    // Pure White main reading labels
  textSub: '#AEAEB2',     // System gray labels
  primary: '#34C759',     // Native iOS Fluid Emerald Green
  primaryTint: 'rgba(52, 199, 89, 0.2)',
  accent: '#0A84FF',      // System Dark Blue utility
  border: 'rgba(255, 255, 255, 0.08)',
  inputBg: 'rgba(0, 0, 0, 0.3)'
};

const DRILLS = [
  { id: '1', name: 'Push-Ups Counter Matrix', type: 'Upper Body Activation', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop&q=60' },
  { id: '2', name: 'Bodyweight Squats Drill', type: 'Lower Body Endurance', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=60' },
  { id: '3', name: 'Core Plank Holding ISO', type: 'Abdominal Isometric Build', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=60' },
  { id: '4', name: 'Jumping Jacks Metric', type: 'Cardio Core Synchronization', img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&auto=format&fit=crop&q=60' },
  { id: '5', name: 'Burpee Conditioning Stack', type: 'Full Body Explosive Power', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&auto=format&fit=crop&q=60' }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState('login'); // Router: 'login', 'signup', 'home', 'workouts', 'history', 'profile'
  const [theme, setTheme] = useState('light');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('Mohamed'); 
  
  const [timeLimitMinutes, setTimeLimitMinutes] = useState('45');
  const [isSystemAccessLocked, setIsSystemAccessLocked] = useState(false);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState([]);
  
  const [screenTimeMinutes, setScreenTimeMinutes] = useState(142); 
  const [cameraActive, setCameraActive] = useState(false);
  const [motionRepsDetected, setMotionRepsDetected] = useState(0);
  const [motionActiveIndicator, setMotionActiveIndicator] = useState(false);

  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = Appearance.getColorScheme();
      setTheme(systemTheme === 'dark' ? 'dark' : 'light'); 
    }
  }, [theme]);

  useEffect(() => {
    const timerPulse = setInterval(() => setScreenTimeMinutes(prev => prev + 1), 60000);
    return () => clearInterval(timerPulse);
  }, []);

  useEffect(() => {
    let internalOpticalProcessor;
    if (cameraActive) {
      internalOpticalProcessor = setInterval(() => {
        const structuralDeltaTrigger = Math.random() > 0.6;
        setMotionActiveIndicator(structuralDeltaTrigger);
        if (structuralDeltaTrigger) {
          setMotionRepsDetected(count => count + 1);
        }
      }, 1000);
    } else {
      setMotionActiveIndicator(false);
    }
    return () => clearInterval(internalOpticalProcessor);
  }, [cameraActive]);

  const isDarkModeDerive = theme === 'dark';
  const colors = isDarkModeDerive ? DARK_COLORS : LIGHT_COLORS;

  const handleExerciseSelectionToggle = (id) => {
    if (selectedExerciseIds.includes(id)) {
      setSelectedExerciseIds(prev => prev.filter(item => item !== id));
    } else {
      if (selectedExerciseIds.length >= 5) return;
      setSelectedExerciseIds(prev => [...prev, id]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.windowContainer, { backgroundColor: colors.bg }]}>
        
        {/* ========================================================
            TAB LAYER A: LIQUID GLASS AUTHENTICATION INTERFACE
           ======================================================== */}
        {currentTab === 'login' && (
          <View style={styles.liquidAuthLayoutRoot}>
            {/* Soft-blurred fluid organic liquid layout nodes */}
            <View style={[styles.liquidOrbPrimary, { backgroundColor: colors.primary }]} />
            <View style={[styles.liquidOrbSecondary, { backgroundColor: colors.accent }]} />

            <ScrollView contentContainerStyle={styles.centerScreenAuthFlowScroller}>
              <View style={[styles.liquidGlassMainCard, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder }]}>
                
                <View style={styles.brandingHeaderColumn}>
                  <Text style={[styles.corporateLogoText, { color: colors.textMain }]}>TIM FIT</Text>
                  <Text style={[styles.corporateSubtitleText, { color: colors.textSub }]}>Liquid Glass Console Access</Text>
                </View>

                <View style={styles.authFormBlockWrapper}>
                  <View style={styles.inputStackGroup}>
                    <Text style={[styles.fieldLabelText, { color: colors.textMain }]}>Email address</Text>
                    <TextInput 
                      style={[styles.liquidGlassInputField, { backgroundColor: colors.inputBg, borderColor: colors.glassBorder, color: colors.textMain }]}
                      placeholder="example@gmail.com"
                      placeholderTextColor={colors.textSub + '90'}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>

                  <View style={styles.inputStackGroup}>
                    <Text style={[styles.fieldLabelText, { color: colors.textMain }]}>Password</Text>
                    <TextInput 
                      style={[styles.liquidGlassInputField, { backgroundColor: colors.inputBg, borderColor: colors.glassBorder, color: colors.textMain }]}
                      placeholder="••••••••••••"
                      placeholderTextColor={colors.textSub + '90'}
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>

                  <TouchableOpacity style={styles.spaceForgetPasswordTouchable}>
                    <Text style={[styles.spaceForgetPasswordText, { color: colors.accent }]}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.liquidGlossyPrimaryButton, { backgroundColor: colors.primary }]}
                    onPress={() => setCurrentTab('home')}
                  >
                    <Text style={styles.actionButtonTextString}>Login</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.textLinkInlineCentral}
                    onPress={() => setCurrentTab('signup')}
                  >
                    <Text style={[styles.spaceAccountSetupToggleText, { color: colors.textSub }]}>
                      New to TIM FIT? <Text style={[styles.spaceSignUpHighlightText, { color: colors.accent }]}>Create Account</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {currentTab === 'signup' && (
          <View style={styles.liquidAuthLayoutRoot}>
            <View style={[styles.liquidOrbPrimary, { backgroundColor: colors.primary }]} />
            <ScrollView contentContainerStyle={styles.centerScreenAuthFlowScroller}>
              <View style={[styles.liquidGlassMainCard, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder }]}>
                
                <View style={styles.brandingHeaderColumn}>
                  <Text style={[styles.corporateLogoText, { color: colors.textMain }]}>TIM FIT</Text>
                  <Text style={[styles.corporateSubtitleText, { color: colors.textSub }]}>Register Fluid Stack</Text>
                </View>

                <View style={styles.authFormBlockWrapper}>
                  <View style={styles.inputStackGroup}>
                    <Text style={[styles.fieldLabelText, { color: colors.textMain }]}>User Profile Name</Text>
                    <TextInput 
                      style={[styles.liquidGlassInputField, { backgroundColor: colors.inputBg, borderColor: colors.glassBorder, color: colors.textMain }]}
                      placeholder="Mohamed"
                      placeholderTextColor={colors.textSub + '90'}
                      value={fullName}
                      onChangeText={setFullName}
                    />
                  </View>

                  <View style={styles.inputStackGroup}>
                    <Text style={[styles.fieldLabelText, { color: colors.textMain }]}>Operational Email</Text>
                    <TextInput 
                      style={[styles.liquidGlassInputField, { backgroundColor: colors.inputBg, borderColor: colors.glassBorder, color: colors.textMain }]}
                      placeholder="mohamed@domain.com"
                      placeholderTextColor={colors.textSub + '90'}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>

                  <TouchableOpacity 
                    style={[styles.liquidGlossyPrimaryButton, { backgroundColor: colors.primary }]}
                    onPress={() => setCurrentTab('home')}
                  >
                    <Text style={styles.actionButtonTextString}>Sign Up Stack</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.textLinkInlineCentral}
                    onPress={() => setCurrentTab('login')}
                  >
                    <Text style={[styles.spaceAccountSetupToggleText, { color: colors.textSub }]}>
                      Already Registered? <Text style={[styles.spaceSignUpHighlightText, { color: colors.accent }]}>Login</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {/* ========================================================
            TAB LAYER B: MAIN APPLICATION LIQUID GLASS SYSTEM CONSOLE
           ======================================================== */}
        {!['login', 'signup'].includes(currentTab) && (
          <>
            {/* TOP BAR PREMIUM GLASS NAVIGATION BAR */}
            <View style={[styles.applicationTopNavHubBar, { backgroundColor: colors.glassBg, borderBottomColor: colors.glassBorder }]}>
              <View style={styles.topLeftProfileSection}>
                <View style={[styles.vectorProfileAvatarCircle, { backgroundColor: colors.primaryTint, borderColor: colors.primary }]}>
                  <Text style={[styles.avatarIdentityCharacterTextChar, { color: colors.primary }]}>
                    {fullName ? fullName.charAt(0).toUpperCase() : 'M'}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.greetingLabelTextSub, { color: colors.textSub }]}>Let's get fit 💪</Text>
                  <Text style={[styles.mainWelcomeHeadlineTitleText, { color: colors.textMain }]}>{fullName}</Text>
                </View>
              </View>
              <View style={styles.topRightUtilityGrouping}>
                <View style={[styles.microBadgePillPill, { backgroundColor: colors.primaryTint, borderColor: colors.primary + '30' }]}>
                  <Text style={[styles.badgeLabelMiniMiniString, { color: colors.primary }]}>LIQUID MODE</Text>
                </View>
              </View>
            </View>

            <ScrollView contentContainerStyle={styles.mainInterfaceScrollerLayout}>
              
              {/* TAB 1: LIQUID CORE HOME PROGRESS VIEW */}
              {currentTab === 'home' && (
                <View style={styles.blockLayoutFull}>
                  
                  {/* METRIC INTERFACE GLOSS RING SURFACES */}
                  <View style={[styles.liquidGlassMainCard, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder }]}>
                    <Text style={[styles.cardHeadlineSmallTitle, { color: colors.textMain }]}>Today's Progress Balance</Text>
                    
                    <View style={styles.quantitativeRingSplitRowSplitLayout}>
                      <View style={styles.vectorProgressRingHousingFrame}>
                        <View style={[styles.vectorOuterRingTrack, { borderColor: colors.primaryTint }]}>
                          <View style={[styles.vectorActiveRingOverlay, { borderTopColor: colors.primary, borderRightColor: colors.primary }]} />
                          <Text style={[styles.vectorRingPercentageLabelNumeric, { color: colors.textMain }]}>75%</Text>
                          <Text style={[styles.vectorRingSubLabelString, { color: colors.textSub }]}>Completed</Text>
                        </View>
                      </View>

                      <View style={styles.statsDataListColumnStatsList}>
                        <View style={styles.metricItemRowQuantitativeEntryRow}>
                          <View style={[styles.vectorIconthumbnailthumbnailThumbnail, { backgroundColor: colors.primaryTint }]}>
                            <Text style={styles.metricMetaStringIconString}>🔥</Text>
                          </View>
                          <View>
                            <Text style={[styles.quantitativeMetricMetaLabelString, { color: colors.textSub }]}>Calories Burned Today</Text>
                            <Text style={[styles.quantitativeMetricMainDisplayValueNumeric, { color: colors.textMain }]}>290 / 400 kcal</Text>
                          </View>
                        </View>

                        <View style={styles.metricItemRowQuantitativeEntryRow}>
                          <View style={[styles.vectorIconthumbnailthumbnailThumbnail, { backgroundColor: colors.primaryTint }]}>
                            <Text style={styles.metricMetaStringIconString}>👟</Text>
                          </View>
                          <View>
                            <Text style={[styles.quantitativeMetricMetaLabelString, { color: colors.textSub }]}>Activity Steps Matrix</Text>
                            <Text style={[styles.quantitativeMetricMainDisplayValueNumeric, { color: colors.textMain }]}>8,245 / 10,000 steps</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* CONSOLE TIME RESTRICTIONS ELEMENT BASEMENT */}
                    <View style={[styles.embeddedInputSubContainerFooterContainer, { borderTopColor: colors.border }]}>
                      <Text style={[styles.consoleSubHeadingTitle, { color: colors.textMain }]}>System Hard Timeout Barrier Setting:</Text>
                      <View style={styles.consoleFlexInputControlControlRow}>
                        <TextInput 
                          style={[styles.terminalNumericFieldInput, { backgroundColor: colors.inputBg, color: colors.textMain, borderColor: colors.glassBorder }]}
                          keyboardType="numeric"
                          value={timeLimitMinutes}
                          onChangeText={setTimeLimitMinutes}
                        />
                        <Text style={[styles.paragraphDescriptionTextString, { color: colors.textSub }]}>Minutes Max Active Buffer Remaining</Text>
                      </View>
                      <TouchableOpacity 
                        style={[styles.securityAccessToggleButton, { backgroundColor: isSystemAccessLocked ? '#FF3B30' : colors.primary }]}
                        onPress={() => setIsSystemAccessLocked(!isSystemAccessLocked)}
                      >
                        <Text style={styles.actionButtonTextString}>
                          {isSystemAccessLocked ? '🔒 System Framework Locked' : '🔓 Engage Security Restrictions'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* LIQUID SUB MATRIX WIDGET BLOCKS SPLIT RENDER */}
                  <View style={[styles.liquidGlassMainCard, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder, marginTop: 16 }]}>
                    <Text style={[styles.cardHeadlineSmallTitle, { color: colors.textMain }]}>Quick Actions Launcher</Text>
                    <View style={styles.quickStartSplitRowDashboardLayout}>
                      <View style={[styles.quickStartLeftCardBlock, { backgroundColor: colors.primaryTint }]}>
                        <Text style={[styles.moduleItemBoldTitleTitle, { color: colors.textMain }]}>Daily Routine</Text>
                        <View style={styles.quickStartIconCircleIndicator}>
                          <Text style={{ fontSize: 22 }}>🏃</Text>
                        </View>
                        <Text style={[styles.paragraphDescriptionTextString, { color: colors.textMain, fontWeight: '700' }]}>Full Body</Text>
                        <Text style={[styles.paragraphDescriptionTextString, { color: colors.textSub, marginBottom: 10 }]}>30 min stack</Text>
                        <TouchableOpacity style={[styles.miniAppButtonExecutionButton, { backgroundColor: colors.primary }]} onPress={() => setCurrentTab('workouts')}>
                          <Text style={styles.microButtonLabelTextStringText}>Start</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.quickStartRightListBlockStack}>
                        <TouchableOpacity style={[styles.quickStartListItemRowField, { backgroundColor: colors.inputBg, borderColor: colors.glassBorder }]} onPress={() => setCurrentTab('workouts')}>
                          <Text style={{ fontSize: 16 }}>🏋️</Text>
                          <Text style={[styles.quickStartListItemTextString, { color: colors.textMain }]}>Workout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.quickStartListItemRowField, { backgroundColor: colors.inputBg, borderColor: colors.glassBorder }]} onPress={() => alert('Launching High Intensity Cardio Tracks.')}>
                          <Text style={{ fontSize: 16 }}>❤️</Text>
                          <Text style={[styles.quickStartListItemTextString, { color: colors.textMain }]}>Cardio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.quickStartListItemRowField, { backgroundColor: colors.inputBg, borderColor: colors.glassBorder }]} onPress={() => alert('Accessing Isometric Balance Streams.')}>
                          <Text style={{ fontSize: 16 }}>🧘</Text>
                          <Text style={[styles.quickStartListItemTextString, { color: colors.textMain }]}>Stretching</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {/* TAB 2: EXERCISE ROUTINE CONFIGURE LAYERS */}
              {currentTab === 'workouts' && (
                <View style={[styles.liquidGlassMainCard, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder }]}>
                  <Text style={[styles.floatingPremiumHeading, { color: colors.textMain }]}>Configure System Drills</Text>
                  <Text style={[styles.paragraphDescriptionTextString, { color: colors.textSub, marginBottom: 16 }]}>
                    Check exactly **4 or 5 options** to populate your optical fluid tracker configuration history ledger stack:
                  </Text>

                  {DRILLS.map(item => {
                    const activeStateSelectionState = selectedExerciseIds.includes(item.id);
                    return (
                      <TouchableOpacity 
                        key={item.id} 
                        style={[styles.premiumWorkoutCheckboxCardRow, { borderColor: activeStateSelectionState ? colors.primary : colors.glassBorder, backgroundColor: activeStateSelectionState ? colors.primaryTint : 'transparent' }]}
                        onPress={() => handleExerciseSelectionToggle(item.id)}
                      >
                        <Image source={{ uri: item.img }} style={styles.premiumWorkoutThumbnailImageSquareSquareImage} />
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.moduleItemBoldTitleTitle, { color: colors.textMain }]}>{item.name}</Text>
                          <Text style={[styles.paragraphDescriptionTextString, { color: colors.textSub }]}>{item.type}</Text>
                        </View>
                        <View style={[styles.premiumVectorCheckboxSquareFrame, { borderColor: colors.primary, backgroundColor: activeStateSelectionState ? colors.primary : 'transparent' }]}>
                          {activeStateSelectionState && <Text style={styles.vectorCheckboxInnerCheckmarkSymbolChar}>✓</Text>}
                        </View>
                      </TouchableOpacity>
                    );
                  })}

                  <Text style={[styles.premiumAlertBannerFeedbackString, { color: (selectedExerciseIds.length >= 4 && selectedExerciseIds.length <= 5) ? colors.primary : '#FF9500' }]}>
                    Selected Stack Count: {selectedExerciseIds.length} / 5 Target Drills Locked
                  </Text>

                  <TouchableOpacity 
                    style={[styles.liquidGlossyPrimaryButton, { backgroundColor: (selectedExerciseIds.length >= 4 && selectedExerciseIds.length <= 5) ? colors.primary : '#CEA4A4', marginTop: 14 }]}
                    disabled={selectedExerciseIds.length < 4 || selectedExerciseIds.length > 5}
                    onPress={() => {
                      setCameraActive(true);
                      setCurrentTab('camera');
                    }}
                  >
                    <Text style={styles.actionButtonTextString}>Initialize Optical Processing Camera ➔</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* TAB 3: OPTICAL DELTA SCANNING CANVAS VIEWFINDER */}
              {currentTab === 'camera' && (
                <View style={[styles.liquidGlassMainCard, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder }]}>
                  <Text style={[styles.floatingPremiumHeading, { color: colors.textMain }]}>🎥 Optical Frame Motion Canvas</Text>
                  <Text style={[styles.paragraphDescriptionTextString, { color: colors.textSub, marginBottom: 12 }]}>
                    Real-time matrix frame differentials running background loop passes. Maintain structural layout positioning stable for delta tracks.
                  </Text>

                  <View style={[styles.premiumStructuralViewfinderViewfinderSimulationFrameContainer, { borderColor: motionActiveIndicator ? colors.primary : '#FF3B30' }]}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600' }} style={styles.simulationBackdropStreamingStreamingImageImageBackdrop} opacity={0.2} />
                    {motionActiveIndicator ? (
                      <Text style={[styles.motionHardwareBannerStatusStringFeedback, { color: colors.primary }]}>▲ FLUID MOVEMENT MATRIX DETECTED</Text>
                    ) : (
                      <Text style={styles.hardwareFallBackFallbackLabelString}>SCANNING ENVIRO-VECTOR MATRIX TRACKS...</Text>
                    )}
                    <View style={styles.hardwareCounterCounterPillFloatingBadgeBadgePillPill}>
                      <Text style={styles.counterTrackerPillValueLabelString}>Logged Action Unit Reps: {motionRepsDetected}</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={[styles.liquidGlossyPrimaryButton, { backgroundColor: '#FF3B30', marginTop: 14 }]} 
                    onPress={() => {
                      setCameraActive(false);
                      setCurrentTab('home');
                    }}
                  >
                    <Text style={styles.actionButtonTextString}>Terminate Feed & Cache Session History</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* TAB 4: AUDITED PERFORMANCE LOG LEDGER */}
              {currentTab === 'history' && (
                <View style={[styles.liquidGlassMainCard, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder }]}>
                  <Text style={[styles.floatingPremiumHeading, { color: colors.textMain }]}>Automated Session Activity Ledger Logs</Text>
                  <Text style={[styles.paragraphDescriptionTextString, { color: colors.textSub, marginBottom: 14 }]}>
                    Historical logs recorded via optical camera telemetry confirmation checks:
                  </Text>

                  <View style={[styles.premiumAuditHistoryRowBlockItemBlockEntry, { backgroundColor: colors.inputBg, borderColor: colors.glassBorder }]}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100' }} style={styles.logEntryThumbnailSquareThumbnailImage} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.moduleItemBoldTitleTitle, { color: colors.textMain }]}>Upper Body Conditioning Stack</Text>
                      <Text style={[styles.paragraphDescriptionTextString, { color: colors.textSub }]}>Verified Check: 35 Reps Audited</Text>
                    </View>
                    <View style={styles.pillBadgeSuccessSuccessIndicatorIndicatorPillSuccessBadge}><Text style={styles.successLabelMiniLabelminiLabelTextString}>AUDITED</Text></View>
                  </View>

                  <View style={[styles.premiumAuditHistoryRowBlockItemBlockEntry, { backgroundColor: colors.inputBg, borderColor: colors.glassBorder }]}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=100' }} style={styles.logEntryThumbnailSquareThumbnailImage} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.moduleItemBoldTitleTitle, { color: colors.textMain }]}>Full Body Activation Stack</Text>
                      <Text style={[styles.paragraphDescriptionTextString, { color: colors.textSub }]}>Verified Check: 15 High Intensity Cycles</Text>
                    </View>
                    <View style={styles.pillBadgeSuccessSuccessIndicatorIndicatorPillSuccessBadge}><Text style={styles.successLabelMiniLabelminiLabelTextString}>AUDITED</Text></View>
                  </View>
                </View>
              )}

              {/* TAB 5: SYSTEM MANAGEMENT CONTROL PANEL */}
              {currentTab === 'profile' && (
                <View style={styles.blockLayoutFull}>
                  <View style={[styles.liquidGlassMainCard, { backgroundColor: colors.glassBg, borderColor: colors.glassBorder }]}>
                    
                    <View style={styles.profileDetailsOverviewRowContainer}>
                      <View style={[styles.profileAvatarDisplayLarge, { backgroundColor: colors.primaryTint, borderColor: colors.primary }]}>
                        <Text style={[styles.profileAvatarTextLargeChar, { color: colors.primary }]}>
                          {fullName ? fullName.charAt(0).toUpperCase() : 'M'}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.profileAccountNameHeadingTitleText, { color: colors.textMain }]}>{fullName}</Text>
                        <Text style={[styles.paragraphDescriptionTextString, { color: colors.textSub }]}>mohamed@gmail.com</Text>
                        <TouchableOpacity style={[styles.editProfileSmallActionButtonPill, { borderColor: colors.primary }]}>
                          <Text style={[styles.editProfileButtonTextString, { color: colors.primary }]}>Edit Profile Parameters</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={[styles.consoleLabelLabelString, { color: colors.textMain, marginTop: 24, marginBottom: 8 }]}>Payment Metadata Info</Text>
                    <View style={[styles.profileNestedMenuOptionListItemField, { borderBottomColor: colors.border }]}>
                      <Text style={styles.profileOptionMetaSymbolIconChar}>🎁</Text>
                      <Text style={[styles.profileOptionMainLabelTitleText, { color: colors.textMain }]}>Loyalty points rewards</Text>
                    </View>
                    <View style={[styles.profileNestedMenuOptionListItemField, { borderBottomColor: colors.border }]}>
                      <Text style={styles.profileOptionMetaSymbolIconChar}>💳</Text>
                      <Text style={[styles.profileOptionMainLabelTitleText, { color: colors.textMain }]}>Integrated payment methods</Text>
                    </View>

                    <Text style={[styles.consoleLabelLabelString, { color: colors.textMain, marginTop: 24, marginBottom: 8 }]}>Settings Workspace</Text>
                    <View style={[styles.profileNestedMenuOptionListItemField, { borderBottomColor: colors.border }]}>
                      <Text style={styles.profileOptionMetaSymbolIconChar}>🌐</Text>
                      <Text style={[styles.profileOptionMainLabelTitleText, { color: colors.textMain }]}>Default system language</Text>
                      <Text style={[styles.profileValueInlineFeedbackRightText, { color: colors.textSub }]}>English</Text>
                    </View>

                    <Text style={[styles.consoleLabelLabelString, { color: colors.textSub, marginTop: 18 }]}>Interface theme color matrix preference:</Text>
                    <View style={styles.themeSelectorGroupSelectorRowRowGroupSelector}>
                      {['light', 'dark', 'system'].map(mode => (
                        <TouchableOpacity 
                          key={mode}
                          style={[styles.themeOptionPillButtonPill, { borderColor: colors.glassBorder }, theme === mode && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                          onPress={() => setTheme(mode)}
                        >
                          <Text style={[styles.themeOptionPillPillLabelTextString, { color: theme === mode ? '#FFF' : colors.textMain }]}>
                            {mode.toUpperCase()}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <Text style={[styles.footerVersionTextVersionFeedbackStringFeedback, { color: colors.primary, marginTop: 24 }]}>
                      Liquid Engine Channel: Apple iOS Stable Stack v54.0.16 Build
                    </Text>
                  </View>

                  <TouchableOpacity 
                    style={[styles.liquidGlossyPrimaryButton, { backgroundColor: '#FF3B30', marginTop: 16 }]}
                    onPress={() => setCurrentTab('login')}
                  >
                    <Text style={styles.actionButtonTextString}>Sign Out Securely & Clear Cache</Text>
                  </TouchableOpacity>
                </View>
              )}

            </ScrollView>

            {/* APPLICATION FOOTER TAB NAVIGATION BAR */}
            <View style={[styles.premiumGlobalBottomApplicationTabBarTabBarTabBarHubHub, { backgroundColor: colors.glassBg, borderTopColor: colors.glassBorder }]}>
              <TouchableOpacity style={styles.tabBarItemTouchableElementTouchableInteractionElementElement} onPress={() => setCurrentTab('home')}>
                <Text style={[styles.tabBarItemIconSymbolSymbolLabelTextStringLabel, { color: currentTab === 'home' ? colors.primary : colors.textSub }]}>🏠</Text>
                <Text style={[styles.tabBarItemStringLabelLabelDescriptionTextLabelText, { color: currentTab === 'home' ? colors.primary : colors.textSub }]}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.tabBarItemTouchableElementTouchableInteractionElementElement} onPress={() => setCurrentTab('workouts')}>
                <Text style={[styles.tabBarItemIconSymbolSymbolLabelTextStringLabel, { color: currentTab === 'workouts' ? colors.primary : colors.textSub }]}>🏋️</Text>
                <Text style={[styles.tabBarItemStringLabelLabelDescriptionTextLabelText, { color: currentTab === 'workouts' ? colors.primary : colors.textSub }]}>Workouts</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.tabBarItemTouchableElementTouchableInteractionElementElement} onPress={() => setCurrentTab('history')}>
                <Text style={[styles.tabBarItemIconSymbolSymbolLabelTextStringLabel, { color: currentTab === 'history' ? colors.primary : colors.textSub }]}>📊</Text>
                <Text style={[styles.tabBarItemStringLabelLabelDescriptionTextLabelText, { color: currentTab === 'history' ? colors.primary : colors.textSub }]}>Progress</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.tabBarItemTouchableElementTouchableInteractionElementElement} onPress={() => setCurrentTab('profile')}>
                <Text style={[styles.tabBarItemIconSymbolSymbolLabelTextStringLabel, { color: currentTab === 'profile' ? colors.primary : colors.textSub }]}>👤</Text>
                <Text style={[styles.tabBarItemStringLabelLabelDescriptionTextLabelText, { color: currentTab === 'profile' ? colors.primary : colors.textSub }]}>Profile</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// --- PREMIUM HIGH-FIDELITY LIQUID GLASSMORPHISM STYLESHEETS ---
const styles = StyleSheet.create({
  windowContainer: { flex: 1 },
  
  // Dynamic premium fluid orb backdrops tracking behind real-time Apple translucent layout layers
  liquidAuthLayoutRoot: { flex: 1, position: 'relative', overflow: 'hidden', justifyContent: 'center' },
  liquidOrbPrimary: { position: 'absolute', width: 280, height: 280, borderRadius: 140, opacity: 0.35, top: '-5%', right: '-10%', blurRadius: 60 },
  liquidOrbSecondary: { position: 'absolute', width: 300, height: 300, borderRadius: 150, opacity: 0.25, bottom: '-5%', left: '-15%', blurRadius: 70 },
  
  // Translucent high-gloss dynamic glass card with highlight border strokes mirroring iPhone UI trends
  liquidGlassMainCard: { width: '100%', padding: 24, borderRadius: 30, borderWidth: 1.5, shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.06, shadowRadius: 20, elevation: 5 },
  centerScreenAuthFlowScroller: { flexGrow: 1, justifyContent: 'center', padding: 20, alignItems: 'center' },
  brandingHeaderColumn: { alignItems: 'center', marginBottom: 28 },
  corporateLogoText: { fontSize: 34, fontWeight: '900', letterSpacing: 4 },
  corporateSubtitleText: { fontSize: 13, fontWeight: '600', marginTop: 4, letterSpacing: 0.2 },
  authFormBlockWrapper: { width: '100%', gap: 16 },
  inputStackGroup: { width: '100%' },
  fieldLabelText: { fontSize: 13, fontWeight: '700', marginBottom: 8, paddingLeft: 2 },
  
  // High-gloss fields matching payment selection input components exactly
  liquidGlassInputField: { width: '100%', height: 50, borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, fontSize: 15, fontWeight: '500' },
  spaceForgetPasswordTouchable: { alignSelf: 'flex-end', marginTop: -2 },
  spaceForgetPasswordText: { fontSize: 13, fontWeight: '600' },
  
  // Rounded glossy high-performance button models
  liquidGlossyPrimaryButton: { width: '100%', height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
  actionButtonTextString: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  spaceAccountSetupToggleText: { fontSize: 13, textAlign: 'center', fontWeight: '500' },
  spaceSignUpHighlightText: { fontWeight: '700' },
  textLinkInlineCentral: { marginTop: 12 },

  // System Core Main Dashboard Layout Panels
  applicationTopNavHubBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  topLeftProfileSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  vectorProfileAvatarCircle: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5 },
  avatarIdentityCharacterTextChar: { fontSize: 16, fontWeight: '800' },
  greetingLabelTextSub: { fontSize: 12, fontWeight: '600' },
  mainWelcomeHeadlineTitleText: { fontSize: 18, fontWeight: '800' },
  topRightUtilityGrouping: { flexDirection: 'row', alignItems: 'center' },
  microBadgePillPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1 },
  badgeLabelMiniMiniString: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  mainInterfaceScrollerLayout: { padding: 16, paddingBottom: 110 },
  blockLayoutFull: { width: '100%' },
  cardHeadlineSmallTitle: { fontSize: 16, fontWeight: '800', marginBottom: 16 },
  quantitativeRingSplitRowSplitLayout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  
  // Mathematical rendering parameters for circular tracking widgets
  vectorProgressRingHousingFrame: { width: 105, height: 105, alignItems: 'center', justifyContent: 'center' },
  vectorOuterRingTrack: { width: 96, height: 96, borderRadius: 48, borderWidth: 8, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  vectorActiveRingOverlay: { width: 96, height: 96, borderRadius: 48, borderWidth: 8, position: 'absolute', borderLeftColor: 'transparent', borderBottomColor: 'transparent', transform: [{ rotate: '45deg' }] },
  vectorRingPercentageLabelNumeric: { fontSize: 18, fontWeight: '900' },
  vectorRingSubLabelString: { fontSize: 9, fontWeight: '600', marginTop: 1 },
  statsDataListColumnStatsList: { flex: 1, paddingLeft: 20, gap: 12 },
  metricItemRowQuantitativeEntryRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  vectorIconthumbnailthumbnailThumbnail: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  metricMetaStringIconString: { fontSize: 18 },
  quantitativeMetricMetaLabelString: { fontSize: 11, fontWeight: '500' },
  quantitativeMetricMainDisplayValueNumeric: { fontSize: 14, fontWeight: '700', marginTop: 1 },
  
  // Custom verification barrier systems
  embeddedInputSubContainerFooterContainer: { marginTop: 18, paddingTop: 16, borderTopWidth: 1 },
  consoleSubHeadingTitle: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  consoleFlexInputControlControlRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  terminalNumericFieldInput: { borderWidth: 1, borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12, width: 65, textAlign: 'center', fontSize: 15, fontWeight: '800' },
  paragraphDescriptionTextString: { fontSize: 13, lineHeight: 18 },
  securityAccessToggleButton: { paddingVertical: 12, borderRadius: 14, alignItems: 'center', justifyContent: 'center', width: '100%' },
  
  // Fluid layout splits grids
  quickStartSplitRowDashboardLayout: { flexDirection: 'row', gap: 12, width: '100%' },
  quickStartLeftCardBlock: { flex: 1.1, borderRadius: 20, padding: 14, alignItems: 'center', justifyContent: 'center' },
  quickStartIconCircleIndicator: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginVertical: 8 },
  miniAppButtonExecutionButton: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10, alignSelf: 'center' },
  microButtonLabelTextStringText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  quickStartRightListBlockStack: { flex: 1, gap: 8, justifyContent: 'center' },
  quickStartListItemRowField: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 14, gap: 10 },
  quickStartListItemTextString: { fontSize: 13, fontWeight: '700' },
  
  // Exercise listing checkbox blocks
  premiumWorkoutCheckboxCardRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 16, marginBottom: 10, gap: 12 },
  premiumWorkoutThumbnailImageSquareSquareImage: { width: 44, height: 44, borderRadius: 12 },
  premiumVectorCheckboxSquareFrame: { width: 22, height: 22, borderWidth: 2, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  vectorCheckboxInnerCheckmarkSymbolChar: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  premiumAlertBannerFeedbackString: { textAlign: 'center', marginVertical: 12, fontWeight: '700', fontSize: 13 },
  
  // Optical camera viewports elements
  premiumStructuralViewfinderViewfinderSimulationFrameContainer: { width: '100%', height: 210, borderRadius: 22, backgroundColor: '#000', borderStyle: 'dashed', borderWidth: 2.5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' },
  simulationBackdropStreamingStreamingImageImageBackdrop: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  motionHardwareBannerStatusStringFeedback: { fontSize: 13, fontWeight: '800' },
  hardwareFallBackFallbackLabelString: { color: '#555', fontSize: 12, fontWeight: '600' },
  hardwareCounterCounterPillFloatingBadgeBadgePillPill: { position: 'absolute', bottom: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10 },
  counterTrackerPillValueLabelString: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  
  // Ledger log listings
  premiumAuditHistoryRowBlockItemBlockEntry: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 16, marginBottom: 10, gap: 12 },
  logEntryThumbnailSquareThumbnailImage: { width: 38, height: 38, borderRadius: 11 },
  pillBadgeSuccessSuccessIndicatorIndicatorPillSuccessBadge: { backgroundColor: 'rgba(52, 199, 89, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  successLabelMiniLabelminiLabelTextString: { color: '#34C759', fontSize: 11, fontWeight: '700' },
  
  // Profile metrics and customization category elements
  profileDetailsOverviewRowContainer: { flexDirection: 'row', alignItems: 'center', gap: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)', paddingBottom: 14 },
  profileAvatarDisplayLarge: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  profileAvatarTextLargeChar: { fontSize: 22, fontWeight: '800' },
  profileAccountNameHeadingTitleText: { fontSize: 18, fontWeight: '800', marginBottom: 2 },
  editProfileSmallActionButtonPill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10, borderWidth: 1, marginTop: 4, alignSelf: 'flex-start' },
  editProfileButtonTextString: { fontSize: 11, fontWeight: '700' },
  profileNestedMenuOptionListItemField: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, gap: 12 },
  profileOptionMetaSymbolIconChar: { fontSize: 18 },
  profileOptionMainLabelTitleText: { flex: 1, fontSize: 14, fontWeight: '600' },
  profileValueInlineFeedbackRightText: { fontSize: 14, fontWeight: '500' },
  floatingPremiumHeading: { fontSize: 18, fontWeight: '800', marginBottom: 6 },
  moduleItemBoldTitleTitle: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  consoleLabelLabelString: { fontSize: 13, fontWeight: '800' },
  themeSelectorGroupSelectorRowRowGroupSelector: { flexDirection: 'row', gap: 6, marginTop: 10 },
  themeOptionPillButtonPill: { flex: 1, paddingVertical: 8, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  themeOptionPillPillLabelTextString: { fontSize: 11, fontWeight: '700' },
  footerVersionTextVersionFeedbackStringFeedback: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  
  // Premium Absolute Base iPhone Navigation Core Bar
  premiumGlobalBottomApplicationTabBarTabBarTabBarHubHub: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 66, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 4 },
  tabBarItemTouchableElementTouchableInteractionElementElement: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 6 },
  tabBarItemIconSymbolSymbolLabelTextStringLabel: { fontSize: 22 },
  tabBarItemStringLabelLabelDescriptionTextLabelText: { fontSize: 10, fontWeight: '700', marginTop: 2 }
});