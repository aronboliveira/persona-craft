# Image Migration CLI Commands

## Date: 2025-02-07

## Overview

Migrated images from `.drive/` to `public/imgs/` to prepare for `.drive/` folder wipe.

---

## 1. Eyebrow Images

### Create Directory Structure

```bash
mkdir -p public/imgs/head/brow/{density,arc/{angle,dist,height},height,length,thickness,growth/{pattern,direction},texture,trimming,uni,slit}
```

### Copy Eyebrow Images

```bash
# Density
cp .drive/closeup/eyes/sketch/brow/density/* public/imgs/head/brow/density/

# Arc (angle, distance, height)
cp .drive/closeup/eyes/sketch/brow/arc/angle/* public/imgs/head/brow/arc/angle/
cp .drive/closeup/eyes/sketch/brow/arc/dist/* public/imgs/head/brow/arc/dist/
cp .drive/closeup/eyes/sketch/brow/arc/height/* public/imgs/head/brow/arc/height/

# Height, Length, Thickness
cp .drive/closeup/eyes/sketch/brow/height/* public/imgs/head/brow/height/
cp .drive/closeup/eyes/sketch/brow/length/* public/imgs/head/brow/length/
cp .drive/closeup/eyes/sketch/brow/thickness/* public/imgs/head/brow/thickness/

# Growth (pattern, direction)
cp .drive/closeup/eyes/sketch/brow/growth/pattern/* public/imgs/head/brow/growth/pattern/
cp .drive/closeup/eyes/sketch/brow/growth/direction/* public/imgs/head/brow/growth/direction/

# Texture, Trimming, Unibrow
cp .drive/closeup/eyes/sketch/brow/texture/* public/imgs/head/brow/texture/
cp .drive/closeup/eyes/sketch/brow/trimming/* public/imgs/head/brow/trimming/
cp .drive/closeup/eyes/sketch/brow/uni/* public/imgs/head/brow/uni/

# Slit
cp .drive/closeup/eyes/sketch/brow/slit/* public/imgs/head/brow/slit/
```

---

## 2. Eye Images

### Create Directory Structure

```bash
mkdir -p public/imgs/head/eye/{ball/{size,depth,fissure,hood,spacing,tilt},iris,pupil/{size,shape},bag/{color,contour},lid/{number,epicanthic/{class,ext}},lashes/{density,curl,length}}
```

### Copy Eye Images

```bash
# Eyeball
cp .drive/closeup/eyes/sketch/ball/size/* public/imgs/head/eye/ball/size/
cp .drive/closeup/eyes/sketch/ball/depth/* public/imgs/head/eye/ball/depth/
cp .drive/closeup/eyes/sketch/ball/fissure/* public/imgs/head/eye/ball/fissure/
cp .drive/closeup/eyes/sketch/ball/hood/* public/imgs/head/eye/ball/hood/
cp .drive/closeup/eyes/sketch/ball/spacing/* public/imgs/head/eye/ball/spacing/
cp .drive/closeup/eyes/sketch/ball/tilt/* public/imgs/head/eye/ball/tilt/

# Iris
cp .drive/closeup/eyes/sketch/ball/iris/size/* public/imgs/head/eye/iris/

# Pupil
cp .drive/closeup/eyes/sketch/ball/pupil/size/* public/imgs/head/eye/pupil/size/
cp .drive/closeup/eyes/sketch/ball/pupil/shape/* public/imgs/head/eye/pupil/shape/

# Bags
cp .drive/closeup/eyes/sketch/bag/contour/* public/imgs/head/eye/bag/contour/
cp .drive/closeup/eyes/sketch/bag/color/* public/imgs/head/eye/bag/color/

# Eyelid
cp .drive/closeup/eyes/sketch/lid/number/* public/imgs/head/eye/lid/number/
cp .drive/closeup/eyes/sketch/lid/epicanthic/class/* public/imgs/head/eye/lid/epicanthic/class/
cp .drive/closeup/eyes/sketch/lid/epicanthic/ext/* public/imgs/head/eye/lid/epicanthic/ext/
```

---

## 3. Ear Images

### Create Directory Structure

```bash
mkdir -p public/imgs/head/ear/{angle,size,shape,lobe,width}
```

### Copy Ear Images

```bash
# Angle (from frt - frontal view)
cp .drive/closeup/ear/frt/* public/imgs/head/ear/angle/

# Size
cp .drive/closeup/ear/sz/* public/imgs/head/ear/size/

# Shape (species-based)
cp .drive/closeup/ear/sp/* public/imgs/head/ear/shape/

# Lobe
cp .drive/closeup/ear/lb/* public/imgs/head/ear/lobe/

# Width
cp .drive/closeup/ear/wdt/* public/imgs/head/ear/width/
```

---

## 4. Eye Color Images

### Create Directory Structure

```bash
mkdir -p public/imgs/head/eye/ball/color
```

### Copy Eye Color Images

```bash
cp .drive/closeup/eyes/iris+sclera/frt/fm/*.png public/imgs/head/eye/ball/color/
```

---

## File Naming Conventions

### Eyebrow Files

- Density: `skt_eyebrow_density_{index}_{code}.png`
- Arc: `skt_eyebrow_arc_{angle|dist|height}_{index}_{code}.png`
- etc.

### Eye Files

- Ball Size: `skt_eyesz_{index}_{code}.png` (xsm, sm, avg, lg, xlg)
- Iris Size: `skt_eyeir_{index}_{code}.png`
- Pupil Size: `skt_eyeppl_{index}_{code}.png`
- Pupil Shape: `skt_eyeball_ppl_shp_{index}_{code}.png`
- Depth: `skt_eye_depth_{index}_{code}.png`
- Fissure: `skt_eye_fissure_{index}_{code}.png`
- Tilt: `skt_eye_tilt_{code}turned.png`
- Spacing: `skt_eye_spacing_{index}_{code}.png`
- Hood: `skt_eye_hood_{f|p|n}.png` (full/partial/none)
- Lid Number: `skt_eye_lid_{1|2|3|4}.png`
- Lid Height: `skt_eye_lid_{lw|md|hg}.png`
- Epicanthic Class: `skt_eye_ecf_{tarsal|palpebral|invers}.png`
- Epicanthic Ext: `skt_eye_ecf_{null|prt|full}.png`

### Ear Files

- Angle: `skt_ear_frt_{index}_{code}.png` (rcs, ntr, prm)
- Size: `skt_ear_sz_{index}_{code}.png` (sm, avg, lg, vlg)
- Shape: `skt_ear_sp_{index}_{code}.png` (hmn, helf, elf, nelf, cat, dog, br, fin, bun)
- Lobe: `skt_ear_lb_{index}_{code}.png` (uat, hat, at)

---

## TypeScript Validation

```bash
npx tsc --noEmit
```

## Unit Tests

```bash
npm test
```

---

## Forms Updated

### Eyebrow Forms (12 files)

1. EyebrowDensityForm.tsx
2. EyebrowArchAngleForm.tsx
3. EyebrowArchDistanceForm.tsx
4. EyebrowHeightForm.tsx
5. EyebrowLengthForm.tsx
6. EyebrowThicknessForm.tsx
7. EyebrowGrowthPatternForm.tsx
8. EyebrowTextureForm.tsx
9. EyebrowTrimmingForm.tsx
10. EyebrowUnibrowForm.tsx
11. EyebrowSlitNumberForm.tsx
12. EyebrowSlitAngleForm.tsx

### Eye Forms (13 files)

1. EyeBallSizeForm.tsx
2. IrisSizeForm.tsx
3. PupilSizeForm.tsx
4. PupilPatternForm.tsx
5. EyeDepthForm.tsx
6. EyeFissureForm.tsx
7. EyeTiltForm.tsx
8. EyeSpacingForm.tsx
9. EyeHoodForm.tsx
10. EyeLidCreaseNumberForm.tsx
11. EyeLidCreaseHeightForm.tsx
12. EyeLidEpicanthicFoldClassForm.tsx
13. EyeLidEpicanthicFoldExtensionForm.tsx

### Ear Forms (5 files)

1. EarAngleForm.tsx
2. EarSizeForm.tsx
3. EarShapeForm.tsx
4. EarLobeForm.tsx
5. EarWidthForm.tsx

### Eye Color Form (1 file)

1. EyeColorForm.tsx

---

## Bug Fixes

### SVG Circle Warning

Fixed in `src/pages/test/Test.tsx`:

- Changed `<canvas><circle>...</canvas>` to `<svg><circle>...</svg>`
- The `<circle>` element is an SVG element, not valid inside `<canvas>`
