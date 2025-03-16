# HUD (Heads Up Display) Technical Specification v2

## Introduction

### Project Overview
The HUD (Heads Up Display) is a web-based simulation of an aircraft heads-up display system, designed to provide real-time flight information in a clear, precise format. This project implements a modern, interactive HUD using web technologies, making it accessible for training, demonstration, and educational purposes.

### Core Purpose
- Simulate key flight instruments and indicators in real-time
- Provide an accurate representation of aircraft attitude and navigation data
- Offer an interactive control interface for simulation parameters
- Demonstrate modern web-based aviation display capabilities

### Key Features
1. Real-time attitude indication (pitch and bank)
2. Dynamic heading display with scrolling tape
3. Configurable display modes (standard and landing approach)
4. Interactive control panel for flight parameters
5. Precise digital readouts with aviation-standard formatting

### Technical Goals
- Achieve high-performance rendering using SVG and CSS transforms
- Maintain accurate aviation display standards
- Provide a responsive and accessible user interface
- Support both mouse/touch and keyboard input methods

## Visual Layout Overview
```ascii
+----------------------------------------------------------+
|                                                           |
|                    Heading Indicator                      |
|              [<] 350 355 360 005 010 [>]                 |
|                         ▼                                 |
|                                                           |
|           ___45°___                                      |
|       30°/         \30°      Bank Indicator              |
|     20°/             \20°                                |
|   10°/                 \10°                              |
|    ▲                     ▲                               |
|                                                          |
|    ___________+10°___________                            |
|                                                          |
|    ___________+5°____________                            |
|                                                          |
|    _________________________    ← Horizon Line (0°)      |
|                                                          |
|            ⊕  ←  Flight Path Marker                      |
|                                                          |
|    _ _ _ _ _ _-5°_ _ _ _ _ _                            |
|                                                          |
|    _ _ _ _ _ _-10°_ _ _ _ _ _                          |
|                                                          |
+----------------------------------------------------------+
|                   CONTROL PANEL                           |
|  +----------+ +----------+ +----------+                   |
|  | Heading  | |  Bank   | |  Pitch   |                   |
|  |   360°   | |   0°    | |   0°     |                   |
|  +----------+ +----------+ +----------+                   |
|  +----------+ +----------+ +----------+                   |
|  | Airspeed | | Altitude | |  Gear   |                   |
|  |  150 kts | | 1000 ft | |   UP    |                   |
|  +----------+ +----------+ +----------+                   |
+----------------------------------------------------------+
```

### Key to Symbols
- ⊕ : Flight Path Marker (center position)
- ▼ : Current heading indicator
- ▲ : Bank angle reference markers
- ___ : Positive pitch lines (solid)
- _ _ : Negative pitch lines (dashed)
- [<][>] : Heading scale markers

## 1. Display Characteristics
- Aspect ratio: 4:3
- Background color: Black (#000000)
- Primary display color: Green (#10B981 - Tailwind green-500)
- Font family: Monospace
- Responsive scaling using Tailwind CSS

## 2. Core Components

### 2.1 Flight Path Marker
- Centered SVG component (30x30 pixels)
- Elements:
  - Center circle: 6px radius, stroke width 1px
  - Horizontal lines: 9px length on each side
  - Vertical line: 9px length on top
- Transformation:
  - Rotates based on bank angle
  - Translates vertically based on pitch (20px per degree)
- Position: Absolute center of display

### 2.2 Heading Indicator
- Position: Top 3% of display
- Width: 300px
- Height: 50px
- SVG viewBox: -120 -20 240 40
- Features:
  - Tick marks every degree
  - Major ticks every 10 degrees with labels
  - Current heading displayed in center
  - Triangle pointer
- Tick Generation:
  - Range: ±30 degrees from current heading
  - Spacing: 4 units per degree
  - Height: 10px for major ticks, 5px for minor

### 2.3 Bank Indicator
- Position: Top 51% of display
- SVG dimensions: 400x400 (scaled to 75%)
- Radius: 150 units
- Tick marks at:
  - Major: ±45 degrees (15px length)
  - Medium: ±30, ±20, ±10 degrees (10px length)
  - Center: 0 degrees
- Bank pointer:
  - Triangle shape
  - 15 units above arc
  - 5 units wide at base

### 2.4 Pitch Ladder
- Pitch line spacing: 20px per degree
- Line types:
  - Standard mode:
    - Major lines: ±10, ±5, 0 degrees
    - Width: 400px for horizon, 200px for others
  - Gear down mode:
    - Additional lines at ±2.5 degrees
    - Width: 150px for 2.5-degree lines
- Line features:
  - End ticks: 10px height
  - Labels: Both sides, padded 2-digit format
  - Positive pitch: Solid lines
  - Zero (horizon): Solid line
  - Negative pitch: Dotted lines

## 3. Control Panel

### 3.1 Layout
- Full-width container
- Black background
- Gray border (#9CA3AF - Tailwind gray-400)
- Header:
  - Height: 40px
  - Title: "CONTROL PANEL"
  - Collapsible with left arrow button

### 3.2 Input Grid
- 3x3 grid layout
- Divided cells with gray borders
- Each cell:
  - Aspect ratio: square
  - Centered content
  - Label
  - Input field
  - Unit display

### 3.3 Input Controls
- Heading:
  - Range: 1-360 degrees
  - Wrapping behavior at limits
  - No spinner buttons
- Bank:
  - Range: -180 to +180 degrees
- Pitch:
  - Range: -90 to +90 degrees
- Gear Position:
  - Toggle between "up" and "down"
  - Affects pitch ladder display

## 4. State Management
### 4.1 UAV State Object
```typescript
interface UAVState {
  heading: number;  // 1-360
  bank: number;     // -180 to +180
  pitch: number;    // -90 to +90
  gearPosition: "up" | "down";
}
```

## 5. Technical Implementation
- Framework: React with TypeScript
- Styling: Tailwind CSS
- SVG for graphics
- Component structure:
  - App (root)
    - HUDDisplay
      - FlightPathMarker
      - HeadingIndicator
      - BankIndicator
      - PitchLadder
    - ControlPanel

## 6. Performance Optimizations
- SVG path caching
- Minimal state updates
- Transform-based animations
- Hardware acceleration via transform3d

## 7. Keyboard Controls
- Arrow keys for pitch/bank adjustment
- Numeric inputs for precise control
- Tab navigation between inputs

## 8. Error Handling
- Input validation for all numeric fields
- Boundary checking for all values
- Graceful fallbacks for invalid states

## 9. Accessibility
- ARIA labels for all controls
- Keyboard navigation support
- High contrast display elements
- Screen reader compatible input labels
