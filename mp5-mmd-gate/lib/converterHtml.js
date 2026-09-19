module.exports = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>MMD → Roblox — conversor de animação</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#120f1c; --panel:#1a1630; --panel-alt:#221c3c; --line:#332c4d;
    --text:#eae6f7; --muted:#9089ab; --accent:#6bd9c8; --accent-dim:#3f7d76;
    --warn:#f0a860; --danger:#e8748a;
    padding-top:env(safe-area-inset-top,0px); padding-bottom:env(safe-area-inset-bottom,0px);
    box-sizing:border-box;
  }
  @media (prefers-color-scheme: light){
    :root:not([data-theme="dark"]){
      --bg:#f5f3fb; --panel:#ffffff; --panel-alt:#efecf8; --line:#ddd7ee;
      --text:#1c1730; --muted:#6b6482; --accent:#1f8f7f; --accent-dim:#bfe9e1;
      --warn:#a5650c; --danger:#b23854;
    }
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;background:var(--bg);color:var(--text);}
  body{
    font-family:'Inter',system-ui,-apple-system,sans-serif;
    line-height:1.55; -webkit-font-smoothing:antialiased;
  }
  h1,h2,h3{font-family:'Space Grotesk',system-ui,sans-serif; font-weight:600; margin:0;}
  .mono{font-family:'IBM Plex Mono',ui-monospace,monospace;}
  a{color:var(--accent);}
  .wrap{max-width:760px; margin:0 auto; padding:56px 24px 96px;}

  .hero{padding-bottom:40px; border-bottom:1px solid var(--line);}
  .hero .eyebrow{font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--accent); letter-spacing:.02em; margin-bottom:14px;}
  .hero h1{font-size:34px; line-height:1.15; max-width:14ch;}
  .hero p{color:var(--muted); font-size:16px; max-width:52ch; margin-top:14px;}
  .grid-deco{width:100%; height:64px; margin-top:28px; opacity:.55;}

  section{padding:40px 0; border-bottom:1px solid var(--line);}
  section:last-of-type{border-bottom:none;}
  section h2{font-size:20px; margin-bottom:6px;}
  section .step-num{font-family:'IBM Plex Mono',monospace; color:var(--accent); font-size:13px; display:block; margin-bottom:8px;}
  section > p.desc{color:var(--muted); font-size:15px; margin:6px 0 20px; max-width:56ch;}

  .dropzone{
    border:1.5px dashed var(--line); border-radius:4px; padding:36px 20px;
    text-align:center; cursor:pointer; transition:border-color .15s ease, background .15s ease;
    background:var(--panel);
  }
  .dropzone:hover, .dropzone.drag{border-color:var(--accent); background:var(--panel-alt);}
  .dropzone .big{font-size:15px; margin-bottom:4px;}
  .dropzone .small{font-size:13px; color:var(--muted);}
  input[type=file]{display:none;}

  .filecard{
    display:flex; align-items:center; justify-content:space-between; gap:12px;
    background:var(--panel); border:1px solid var(--line); border-radius:4px;
    padding:14px 16px; margin-top:14px;
  }
  .filecard .name{font-family:'IBM Plex Mono',monospace; font-size:13px;}
  .filecard button{background:none; border:none; color:var(--muted); cursor:pointer; font-size:13px; text-decoration:underline;}

  .stat-row{display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:4px; overflow:hidden; margin-top:18px;}
  .stat{background:var(--panel); padding:16px 14px;}
  .stat .num{font-family:'IBM Plex Mono',monospace; font-size:22px; color:var(--accent);}
  .stat .lbl{font-size:12px; color:var(--muted); margin-top:4px;}

  .bone-table{width:100%; border-collapse:collapse; margin-top:18px; font-size:13px;}
  .bone-table th{text-align:left; font-weight:500; color:var(--muted); padding:8px 10px; border-bottom:1px solid var(--line); font-family:'IBM Plex Mono',monospace; font-size:11px;}
  .bone-table td{padding:7px 10px; border-bottom:1px solid var(--line);}
  .bone-table tr:last-child td{border-bottom:none;}
  .tag{display:inline-block; padding:2px 7px; border-radius:3px; font-family:'IBM Plex Mono',monospace; font-size:11px;}
  .tag.ok{background:rgba(107,217,200,.15); color:var(--accent);}
  .tag.miss{background:rgba(240,168,96,.15); color:var(--warn);}
  .bone-src{font-family:'IBM Plex Mono',monospace;}

  .field{margin-bottom:20px;}
  .field label{display:block; font-size:14px; margin-bottom:6px;}
  .field .hint{font-size:12.5px; color:var(--muted); margin-top:5px;}
  .field input[type=number]{
    width:120px; background:var(--panel); border:1px solid var(--line); color:var(--text);
    padding:9px 10px; border-radius:4px; font-family:'IBM Plex Mono',monospace; font-size:14px;
  }
  .field input[type=range]{width:100%; accent-color:var(--accent);}
  .switch-row{display:flex; align-items:center; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--line);}
  .switch-row:last-child{border-bottom:none;}
  .switch-row .lbl{font-size:14px;}
  .switch-row .hint{font-size:12.5px; color:var(--muted); margin-top:3px;}
  .switch{position:relative; width:40px; height:22px; flex:0 0 auto;}
  .switch input{opacity:0; width:100%; height:100%; position:absolute; margin:0; cursor:pointer;}
  .switch .track{position:absolute; inset:0; background:var(--line); border-radius:11px; transition:background .15s;}
  .switch .thumb{position:absolute; top:2px; left:2px; width:18px; height:18px; border-radius:50%; background:var(--muted); transition:transform .15s, background .15s;}
  .switch input:checked + .track{background:var(--accent-dim);}
  .switch input:checked ~ .thumb{transform:translateX(18px); background:var(--accent);}

  button.primary{
    background:var(--accent); color:#0c1614; border:none; padding:13px 22px;
    font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:15px;
    border-radius:4px; cursor:pointer;
  }
  button.primary:disabled{opacity:.4; cursor:not-allowed;}
  button.primary:not(:disabled):hover{filter:brightness(1.08);}

  .log{
    margin-top:16px; background:var(--panel); border:1px solid var(--line); border-radius:4px;
    padding:14px 16px; font-family:'IBM Plex Mono',monospace; font-size:12.5px; color:var(--muted);
    max-height:200px; overflow-y:auto;
  }
  .log div{padding:2px 0;}
  .log .warn{color:var(--warn);}

  .download-card{
    display:none; margin-top:18px; background:var(--panel); border:1px solid var(--accent-dim);
    border-radius:4px; padding:18px;
  }
  .download-card.show{display:block;}
  .download-card a.dl{
    display:inline-block; margin-top:10px; background:var(--accent); color:#0c1614;
    padding:10px 18px; border-radius:4px; text-decoration:none; font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:14px;
  }

  .notes{background:var(--panel-alt); border-radius:4px; padding:20px; margin-top:8px;}
  .notes h3{font-size:15px; margin-bottom:10px;}
  .notes ul{margin:0; padding-left:18px; color:var(--muted); font-size:13.5px;}
  .notes li{margin-bottom:8px;}
  .notes li:last-child{margin-bottom:0;}

  footer{padding:32px 0 0; color:var(--muted); font-size:12.5px; text-align:center;}

  ::selection{background:var(--accent); color:#0c1614;}
</style>
</head>
<body>
<div class="wrap">

  <div class="hero">
    <div class="eyebrow">conversor VMD → R15</div>
    <h1>MMD para Roblox</h1>
    <p>Envie uma animação de dança em .vmd, e a ferramenta faz o mapeamento inteligente dos ossos da MMD para o rig R15 e converte o sistema de coordenadas automaticamente. O resultado sai como um arquivo .rbxmx pronto pra inserir no Roblox Studio.</p>
    <svg class="grid-deco" viewBox="0 0 700 64" preserveAspectRatio="none">
      <g stroke="var(--accent-dim)" stroke-width="1">
        <line x1="0" y1="8" x2="700" y2="8"/><line x1="0" y1="24" x2="700" y2="24"/>
        <line x1="0" y1="40" x2="700" y2="40"/><line x1="0" y1="56" x2="700" y2="56"/>
        <line x1="70" y1="0" x2="70" y2="64"/><line x1="175" y1="0" x2="175" y2="64"/>
        <line x1="280" y1="0" x2="280" y2="64"/><line x1="385" y1="0" x2="385" y2="64"/>
        <line x1="490" y1="0" x2="490" y2="64"/><line x1="595" y1="0" x2="595" y2="64"/>
      </g>
    </svg>
  </div>

  <section id="sec-upload">
    <span class="step-num">01 · ARQUIVO</span>
    <h2>Envie o .vmd</h2>
    <p class="desc">Arquivo de motion capture do MikuMikuDance, com as rotações dos ossos por frame.</p>
    <div class="dropzone" id="dropzone">
      <div class="big">Arraste o arquivo .vmd aqui ou clique pra escolher</div>
      <div class="small">Só o motion data é lido — nada é enviado pra fora do navegador</div>
      <input type="file" id="fileInput" accept=".vmd">
    </div>
    <div class="filecard" id="fileCard" style="display:none">
      <span class="name mono" id="fileName"></span>
      <button id="clearFile">trocar arquivo</button>
    </div>
    <div class="stat-row" id="statRow" style="display:none">
      <div class="stat"><div class="num" id="statBones">–</div><div class="lbl">ossos com dados</div></div>
      <div class="stat"><div class="num" id="statFrames">–</div><div class="lbl">último frame</div></div>
      <div class="stat"><div class="num" id="statDur">–</div><div class="lbl">duração (30fps)</div></div>
    </div>
  </section>

  <section id="sec-mapping" style="display:none">
    <span class="step-num">02 · MAPEAMENTO</span>
    <h2>Ossos reconhecidos</h2>
    <p class="desc">Cada osso da MMD é combinado no encaixe correspondente do rig R15. Ossos fora dessa lista (dedos, IK, física de cabelo/roupa) são ignorados nesta conversão.</p>
    <table class="bone-table">
      <thead><tr><th>osso MMD</th><th>parte R15</th><th>status</th></tr></thead>
      <tbody id="mappingBody"></tbody>
    </table>
  </section>

  <section id="sec-settings" style="display:none">
    <span class="step-num">03 · AJUSTES</span>
    <h2>Configurações de exportação</h2>

    <div class="field">
      <label for="scaleInput">Escala (studs do Roblox por unidade MMD)</label>
      <input type="number" id="scaleInput" value="0.28" step="0.01" min="0.01">
      <div class="hint">Controla o quanto o deslocamento do osso Center se move no Roblox. Se o personagem "andar" demais ou de menos, ajuste aqui.</div>
    </div>

    <div class="field">
      <label for="rateInput">Taxa de keyframes: <span id="rateVal" class="mono">30</span> fps</label>
      <input type="range" id="rateInput" min="10" max="60" step="1" value="30">
      <div class="hint">Mais alto = movimento mais fiel, arquivo maior. 30fps já cobre a maioria das danças de MMD.</div>
    </div>

    <div class="switch-row">
      <div>
        <div class="lbl">Inverter direção (180°)</div>
        <div class="hint">Ative se o personagem importar de costas ou espelhado no Studio</div>
      </div>
      <label class="switch"><input type="checkbox" id="flipToggle"><span class="track"></span><span class="thumb"></span></label>
    </div>
    <div class="switch-row">
      <div>
        <div class="lbl">Loop</div>
        <div class="hint">Marca a KeyframeSequence como Loop = true</div>
      </div>
      <label class="switch"><input type="checkbox" id="loopToggle"><span class="track"></span><span class="thumb"></span></label>
    </div>
  </section>

  <section id="sec-export" style="display:none">
    <span class="step-num">04 · EXPORTAR</span>
    <h2>Gerar arquivo</h2>
    <p class="desc">Gera um <span class="mono">.rbxmx</span> com uma KeyframeSequence. No Studio: <span class="mono">File → Insert from File</span>, depois arraste o objeto pra dentro de um Animation Editor (ou pegue a KeyframeSequence direto via script).</p>
    <button class="primary" id="exportBtn" disabled>Converter e gerar .rbxmx</button>
    <div class="log" id="log" style="display:none"></div>
    <div class="download-card" id="downloadCard">
      <div style="font-size:14px">Pronto — <span class="mono" id="dlStats"></span></div>
      <a class="dl" id="dlLink" download="mmd_animation.rbxmx">Baixar mmd_animation.rbxmx</a>
    </div>
  </section>

  <section>
    <div class="notes">
      <h3>Limitações honestas</h3>
      <ul>
        <li>O mapeamento usa nomes-padrão de ossos MMD (センター, 上半身, 左腕, etc). Rigs com nomes muito customizados podem precisar de ajuste manual depois.</li>
        <li>Pernas animadas via ossos de IK (足IK) em vez de rotação direta da coxa/joelho não são resolvidas — esta ferramenta lê apenas rotações diretas (FK), sem um solver de IK completo.</li>
        <li>Dedos, física de cabelo/roupa e morphs faciais não são convertidos — o R15 padrão não tem esses ossos.</li>
        <li>A escala e a orientação inicial quase sempre precisam de um ajuste fino depois de importar — normal em qualquer pipeline de retarget, não só neste.</li>
      </ul>
    </div>
  </section>

  <footer>feito no navegador — nenhum arquivo sai do seu computador</footer>
</div>

<script>
(function(){
  "use strict";

  // ---------- bone name dictionary ----------
  const BONE_ALIASES = {
    center: ["センター","せんたー","center","Center"],
    groove: ["グルーブ","ぐるーぶ","groove","Groove"],
    lowerBody: ["下半身","したはんしん","lower body","LowerBody"],
    upperBody: ["上半身","うわはんしん","upper body","UpperBody"],
    upperBody2: ["上半身2","UpperBody2"],
    neck: ["首","くび","neck","Neck"],
    head: ["頭","あたま","head","Head"],
    leftArm: ["左腕","ひだりうで","left arm","LeftArm"],
    rightArm: ["右腕","みぎうで","right arm","RightArm"],
    leftElbow: ["左ひじ","左肘","ひだりひじ","left elbow","LeftElbow"],
    rightElbow: ["右ひじ","右肘","みぎひじ","right elbow","RightElbow"],
    leftWrist: ["左手首","ひだりてくび","left wrist","LeftWrist"],
    rightWrist: ["右手首","みぎてくび","right wrist","RightWrist"],
    leftLeg: ["左足","ひだりあし","left leg","LeftLeg"],
    rightLeg: ["右足","みぎあし","right leg","RightLeg"],
    leftKnee: ["左ひざ","左膝","ひだりひざ","left knee","LeftKnee"],
    rightKnee: ["右ひざ","右膝","みぎひざ","right knee","RightKnee"],
    leftAnkle: ["左足首","ひだりあしくび","left ankle","LeftAnkle"],
    rightAnkle: ["右足首","みぎあしくび","right ankle","RightAnkle"]
  };

  const R15_LABEL = {
    center:"HumanoidRootPart (posição)", groove:"HumanoidRootPart (posição)",
    lowerBody:"LowerTorso", upperBody:"UpperTorso", upperBody2:"UpperTorso (soma)",
    neck:"Head (soma)", head:"Head (soma)",
    leftArm:"LeftUpperArm", rightArm:"RightUpperArm",
    leftElbow:"LeftLowerArm", rightElbow:"RightLowerArm",
    leftWrist:"LeftHand", rightWrist:"RightHand",
    leftLeg:"LeftUpperLeg", rightLeg:"RightUpperLeg",
    leftKnee:"LeftLowerLeg", rightKnee:"RightLowerLeg",
    leftAnkle:"LeftFoot", rightAnkle:"RightFoot"
  };

  const HIERARCHY = {
    HumanoidRootPart:["LowerTorso"],
    LowerTorso:["UpperTorso","LeftUpperLeg","RightUpperLeg"],
    UpperTorso:["LeftUpperArm","RightUpperArm","Head"],
    LeftUpperArm:["LeftLowerArm"], LeftLowerArm:["LeftHand"],
    RightUpperArm:["RightLowerArm"], RightLowerArm:["RightHand"],
    LeftUpperLeg:["LeftLowerLeg"], LeftLowerLeg:["LeftFoot"],
    RightUpperLeg:["RightLowerLeg"], RightLowerLeg:["RightFoot"]
  };

  // ---------- quaternion / vector math ----------
  function qIdentity(){ return {x:0,y:0,z:0,w:1}; }
  function qMul(a,b){
    return {
      x:a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y,
      y:a.w*b.y - a.x*b.z + a.y*b.w + a.z*b.x,
      z:a.w*b.z + a.x*b.y - a.y*b.x + a.z*b.w,
      w:a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z
    };
  }
  function qNormalize(q){
    const n = Math.sqrt(q.x*q.x+q.y*q.y+q.z*q.z+q.w*q.w) || 1;
    return {x:q.x/n,y:q.y/n,z:q.z/n,w:q.w/n};
  }
  function qSlerp(a,b,t){
    let cosom = a.x*b.x+a.y*b.y+a.z*b.z+a.w*b.w;
    let bx=b.x,by=b.y,bz=b.z,bw=b.w;
    if(cosom<0){cosom=-cosom;bx=-bx;by=-by;bz=-bz;bw=-bw;}
    let s0,s1;
    if(1-cosom>1e-6){
      const omega=Math.acos(cosom), sinom=Math.sin(omega);
      s0=Math.sin((1-t)*omega)/sinom; s1=Math.sin(t*omega)/sinom;
    } else { s0=1-t; s1=t; }
    return qNormalize({x:a.x*s0+bx*s1, y:a.y*s0+by*s1, z:a.z*s0+bz*s1, w:a.w*s0+bw*s1});
  }
  function lerp(a,b,t){return a+(b-a)*t;}
  function vLerp(a,b,t){return {x:lerp(a.x,b.x,t), y:lerp(a.y,b.y,t), z:lerp(a.z,b.z,t)};}

  // convert MMD (left-handed, Z-forward) quat/pos to Roblox (right-handed) space
  function convertQuat(q){ return {x:q.x, y:q.y, z:-q.z, w:-q.w}; }
  function convertPos(p, scale){ return {x:p.x*scale, y:p.y*scale, z:-p.z*scale}; }

  function quatToRotMatrix(q){
    const {x,y,z,w}=q;
    return [
      1-2*(y*y+z*z), 2*(x*y-w*z),   2*(x*z+w*y),
      2*(x*y+w*z),   1-2*(x*x+z*z), 2*(y*z-w*x),
      2*(x*z-w*y),   2*(y*z+w*x),   1-2*(x*x+y*y)
    ];
  }

  // ---------- VMD parsing ----------
  function decodeSJIS(bytes){
    try{
      const dec = new TextDecoder("shift-jis");
      let s = dec.decode(bytes);
      const nul = s.indexOf("\\u0000");
      if(nul>=0) s = s.slice(0,nul);
      return s.trim();
    }catch(e){ return "?"; }
  }

  function parseVMD(buf){
    const dv = new DataView(buf);
    const u8 = new Uint8Array(buf);
    let off = 0;

    const headerBytes = u8.slice(0,30);
    let headerStr = "";
    try{ headerStr = new TextDecoder("shift-jis").decode(headerBytes); }catch(e){}
    off = 30;
    const isV2 = headerStr.indexOf("0002") >= 0;
    off += isV2 ? 20 : 10; // model name field

    const boneCount = dv.getUint32(off, true); off += 4;
    const bones = {}; // name -> [{frame,pos,quat}]
    let maxFrame = 0;
    const RECORD = 111;

    for(let i=0;i<boneCount;i++){
      if(off + RECORD > buf.byteLength) break;
      const nameBytes = u8.slice(off, off+15);
      const name = decodeSJIS(nameBytes);
      off += 15;
      const frame = dv.getUint32(off, true); off += 4;
      const px = dv.getFloat32(off, true); off+=4;
      const py = dv.getFloat32(off, true); off+=4;
      const pz = dv.getFloat32(off, true); off+=4;
      const qx = dv.getFloat32(off, true); off+=4;
      const qy = dv.getFloat32(off, true); off+=4;
      const qz = dv.getFloat32(off, true); off+=4;
      const qw = dv.getFloat32(off, true); off+=4;
      off += 64; // interpolation curve, unused (linear/slerp resample instead)

      if(!bones[name]) bones[name]=[];
      bones[name].push({frame, pos:{x:px,y:py,z:pz}, quat:{x:qx,y:qy,z:qz,w:qw}});
      if(frame>maxFrame) maxFrame=frame;
    }
    for(const k in bones) bones[k].sort((a,b)=>a.frame-b.frame);
    return {bones, maxFrame, boneRecordCount:boneCount};
  }

  function findAlias(bones, aliasList){
    for(const nm of aliasList){ if(bones[nm]) return nm; }
    // case-insensitive fallback for latin variants
    const lower = aliasList.map(a=>a.toLowerCase());
    for(const key in bones){
      if(lower.indexOf(key.toLowerCase())>=0) return key;
    }
    return null;
  }

  function sampleQuat(track, frame){
    if(!track || track.length===0) return qIdentity();
    if(frame<=track[0].frame) return track[0].quat;
    if(frame>=track[track.length-1].frame) return track[track.length-1].quat;
    let lo=0, hi=track.length-1;
    while(hi-lo>1){ const mid=(lo+hi)>>1; if(track[mid].frame<=frame) lo=mid; else hi=mid; }
    const a=track[lo], b=track[hi];
    const t = (b.frame===a.frame) ? 0 : (frame-a.frame)/(b.frame-a.frame);
    return qSlerp(a.quat, b.quat, t);
  }
  function samplePos(track, frame){
    if(!track || track.length===0) return {x:0,y:0,z:0};
    if(frame<=track[0].frame) return track[0].pos;
    if(frame>=track[track.length-1].frame) return track[track.length-1].pos;
    let lo=0, hi=track.length-1;
    while(hi-lo>1){ const mid=(lo+hi)>>1; if(track[mid].frame<=frame) lo=mid; else hi=mid; }
    const a=track[lo], b=track[hi];
    const t = (b.frame===a.frame) ? 0 : (frame-a.frame)/(b.frame-a.frame);
    return vLerp(a.pos, b.pos, t);
  }

  // ---------- UI wiring ----------
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileCard = document.getElementById("fileCard");
  const fileName = document.getElementById("fileName");
  const clearFile = document.getElementById("clearFile");
  const statRow = document.getElementById("statRow");
  const statBones = document.getElementById("statBones");
  const statFrames = document.getElementById("statFrames");
  const statDur = document.getElementById("statDur");
  const secMapping = document.getElementById("sec-mapping");
  const mappingBody = document.getElementById("mappingBody");
  const secSettings = document.getElementById("sec-settings");
  const secExport = document.getElementById("sec-export");
  const exportBtn = document.getElementById("exportBtn");
  const rateInput = document.getElementById("rateInput");
  const rateVal = document.getElementById("rateVal");
  const scaleInput = document.getElementById("scaleInput");
  const flipToggle = document.getElementById("flipToggle");
  const loopToggle = document.getElementById("loopToggle");
  const logEl = document.getElementById("log");
  const downloadCard = document.getElementById("downloadCard");
  const dlLink = document.getElementById("dlLink");
  const dlStats = document.getElementById("dlStats");

  let parsed = null;
  let matched = {};

  rateInput.addEventListener("input", ()=>{ rateVal.textContent = rateInput.value; });

  dropzone.addEventListener("click", ()=>fileInput.click());
  dropzone.addEventListener("dragover", e=>{e.preventDefault(); dropzone.classList.add("drag");});
  dropzone.addEventListener("dragleave", ()=>dropzone.classList.remove("drag"));
  dropzone.addEventListener("drop", e=>{
    e.preventDefault(); dropzone.classList.remove("drag");
    if(e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener("change", e=>{
    if(e.target.files.length) handleFile(e.target.files[0]);
  });
  clearFile.addEventListener("click", ()=>{
    parsed=null; matched={};
    fileCard.style.display="none"; statRow.style.display="none";
    secMapping.style.display="none"; secSettings.style.display="none"; secExport.style.display="none";
    downloadCard.classList.remove("show"); logEl.style.display="none";
    fileInput.value="";
  });

  function handleFile(file){
    if(!file.name.toLowerCase().endsWith(".vmd")){
      alert("Esse arquivo não parece ser um .vmd");
      return;
    }
    fileName.textContent = file.name;
    fileCard.style.display="flex";
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        parsed = parseVMD(reader.result);
      }catch(err){
        alert("Não consegui ler esse .vmd: " + err.message);
        return;
      }
      renderParsed();
    };
    reader.readAsArrayBuffer(file);
  }

  function renderParsed(){
    const boneNames = Object.keys(parsed.bones);
    statBones.textContent = boneNames.length;
    statFrames.textContent = parsed.maxFrame;
    statDur.textContent = (parsed.maxFrame/30).toFixed(1)+"s";
    statRow.style.display="grid";

    matched = {};
    mappingBody.innerHTML = "";
    for(const key in BONE_ALIASES){
      const found = findAlias(parsed.bones, BONE_ALIASES[key]);
      matched[key] = found;
      const tr = document.createElement("tr");
      const tdSrc = document.createElement("td");
      tdSrc.className = "bone-src";
      tdSrc.textContent = found || BONE_ALIASES[key][0];
      const tdDst = document.createElement("td");
      tdDst.textContent = R15_LABEL[key];
      const tdStatus = document.createElement("td");
      const tag = document.createElement("span");
      tag.className = "tag " + (found ? "ok":"miss");
      tag.textContent = found ? "mapeado" : "não encontrado";
      tdStatus.appendChild(tag);
      tr.appendChild(tdSrc); tr.appendChild(tdDst); tr.appendChild(tdStatus);
      mappingBody.appendChild(tr);
    }

    secMapping.style.display="block";
    secSettings.style.display="block";
    secExport.style.display="block";
    exportBtn.disabled = false;
    downloadCard.classList.remove("show");
    logEl.style.display="none";
  }

  function appendLog(msg, warn){
    const d = document.createElement("div");
    if(warn) d.className="warn";
    d.textContent = msg;
    logEl.appendChild(d);
  }

  exportBtn.addEventListener("click", ()=>{
    if(!parsed) return;
    logEl.style.display="block";
    logEl.innerHTML = "";
    downloadCard.classList.remove("show");

    const scale = parseFloat(scaleInput.value) || 0.28;
    const rate = parseInt(rateInput.value,10) || 30;
    const flip = flipToggle.checked;
    const loop = loopToggle.checked;

    const anyLegFK = matched.leftLeg || matched.rightLeg || matched.leftKnee || matched.rightKnee;
    if(!anyLegFK){
      appendLog("Não achei rotação direta de perna (coxa/joelho). Se a dança usa IK nas pernas, o movimento das pernas pode não aparecer.", true);
    }
    const missing = Object.keys(matched).filter(k=>!matched[k]);
    if(missing.length){
      appendLog("Ossos não encontrados no arquivo, ficam parados na pose de descanso: " + missing.map(k=>R15_LABEL[k]).join(", "), true);
    }
    appendLog("Convertendo com escala "+scale+", "+rate+"fps"+(flip?", direção invertida":"")+"...");

    const durationSec = parsed.maxFrame/30;
    const stepSec = 1/rate;
    const times = [];
    for(let t=0; t<durationSec; t+=stepSec) times.push(t);
    times.push(durationSec);

    const flipQ = {x:0,y:1,z:0,w:0};

    const keyframesXML = [];
    let refCounter = 1;

    function poseXML(name, quat, pos, children){
      const ref = "RBX" + (refCounter++);
      const m = quatToRotMatrix(quat);
      let xml = '<Item class="Pose" referent="'+ref+'"><Properties>';
      xml += '<string name="Name">'+name+'</string>';
      xml += '<CoordinateFrame name="CFrame"><X>'+pos.x+'</X><Y>'+pos.y+'</Y><Z>'+pos.z+'</Z>';
      xml += '<R00>'+m[0]+'</R00><R01>'+m[1]+'</R01><R02>'+m[2]+'</R02>';
      xml += '<R10>'+m[3]+'</R10><R11>'+m[4]+'</R11><R12>'+m[5]+'</R12>';
      xml += '<R20>'+m[6]+'</R20><R21>'+m[7]+'</R21><R22>'+m[8]+'</R22></CoordinateFrame>';
      xml += '<token name="EasingDirection">0</token><token name="EasingStyle">0</token>';
      xml += '<float name="Weight">1</float>';
      xml += '</Properties>';
      for(const c of children) xml += c;
      xml += '</Item>';
      return xml;
    }

    for(const t of times){
      const frame = t*30;

      const centerTrack = matched.center ? parsed.bones[matched.center] : null;
      const grooveTrack = matched.groove ? parsed.bones[matched.groove] : null;
      let rootPos = {x:0,y:0,z:0};
      let rootQuat = qIdentity();
      if(centerTrack){
        const cp = samplePos(centerTrack, frame);
        rootPos = {x:rootPos.x+cp.x, y:rootPos.y+cp.y, z:rootPos.z+cp.z};
        rootQuat = sampleQuat(centerTrack, frame);
      }
      if(grooveTrack){
        const gp = samplePos(grooveTrack, frame);
        rootPos = {x:rootPos.x+gp.x, y:rootPos.y+gp.y, z:rootPos.z+gp.z};
      }
      let rootQC = convertQuat(rootQuat);
      let rootPC = convertPos(rootPos, scale);
      if(flip){
        rootQC = qMul(flipQ, rootQC);
        rootPC = {x:-rootPC.x, y:rootPC.y, z:-rootPC.z};
      }

      function limbQuat(key){
        const track = matched[key] ? parsed.bones[matched[key]] : null;
        if(!track) return qIdentity();
        return convertQuat(sampleQuat(track, frame));
      }

      const lowerTorsoQ = limbQuat("lowerBody");
      let upperTorsoQ = limbQuat("upperBody");
      if(matched.upperBody2){
        upperTorsoQ = qMul(upperTorsoQ, limbQuat("upperBody2"));
      }
      let headQ = limbQuat("neck");
      headQ = qMul(headQ, limbQuat("head"));

      const zero = {x:0,y:0,z:0};
      const leftHand = poseXML("LeftHand", limbQuat("leftWrist"), zero, []);
      const leftLowerArm = poseXML("LeftLowerArm", limbQuat("leftElbow"), zero, [leftHand]);
      const leftUpperArm = poseXML("LeftUpperArm", limbQuat("leftArm"), zero, [leftLowerArm]);
      const rightHand = poseXML("RightHand", limbQuat("rightWrist"), zero, []);
      const rightLowerArm = poseXML("RightLowerArm", limbQuat("rightElbow"), zero, [rightHand]);
      const rightUpperArm = poseXML("RightUpperArm", limbQuat("rightArm"), zero, [rightLowerArm]);
      const head = poseXML("Head", headQ, zero, []);
      const upperTorso = poseXML("UpperTorso", upperTorsoQ, zero, [leftUpperArm, rightUpperArm, head]);

      const leftFoot = poseXML("LeftFoot", limbQuat("leftAnkle"), zero, []);
      const leftLowerLeg = poseXML("LeftLowerLeg", limbQuat("leftKnee"), zero, [leftFoot]);
      const leftUpperLeg = poseXML("LeftUpperLeg", limbQuat("leftLeg"), zero, [leftLowerLeg]);
      const rightFoot = poseXML("RightFoot", limbQuat("rightAnkle"), zero, []);
      const rightLowerLeg = poseXML("RightLowerLeg", limbQuat("rightKnee"), zero, [rightFoot]);
      const rightUpperLeg = poseXML("RightUpperLeg", limbQuat("rightLeg"), zero, [rightLowerLeg]);

      const lowerTorso = poseXML("LowerTorso", lowerTorsoQ, zero, [upperTorso, leftUpperLeg, rightUpperLeg]);
      const root = poseXML("HumanoidRootPart", rootQC, rootPC, [lowerTorso]);

      const kfRef = "RBX" + (refCounter++);
      const kfXml = '<Item class="Keyframe" referent="'+kfRef+'"><Properties>'
        + '<string name="Name">KF_'+t.toFixed(3).replace(".","_")+'</string>'
        + '<float name="Time">'+t.toFixed(4)+'</float>'
        + '<bool name="GoodTransition">false</bool>'
        + '</Properties>' + root + '</Item>';
      keyframesXML.push(kfXml);
    }

    const seqRef = "RBX0";
    const xml = '<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">'
      + '<Item class="KeyframeSequence" referent="'+seqRef+'"><Properties>'
      + '<string name="Name">MMDImport</string>'
      + '<bool name="Loop">'+(loop?"true":"false")+'</bool>'
      + '<bool name="Priority">false</bool>'
      + '</Properties>'
      + keyframesXML.join("")
      + '</Item></roblox>';

    const blob = new Blob([xml], {type:"application/xml"});
    const url = URL.createObjectURL(blob);
    dlLink.href = url;
    dlStats.textContent = times.length + " keyframes, " + durationSec.toFixed(1) + "s";
    downloadCard.classList.add("show");
    appendLog("Pronto. "+times.length+" keyframes gerados.");
  });

})();
</script>
</body>
</html>
`;
