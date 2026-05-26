(function () {
  const slides = [
    {
      num: "20",
      text: "Сегодня тебе двадцать. Пусть этот день будет тихим и очень твоим.",
    },
    {
      num: "19",
      text: "Год назад ты уже был сильным — просто ещё не знал, насколько.",
    },
    {
      num: "18",
      text: "Восемнадцать — когда официально взрослый, а по ощущениям всё только начинается.",
    },
    {
      num: "16",
      text: "Шестнадцать — бесконечные разговоры до ночи и ощущение, что впереди целая вселенная.",
    },
    {
      num: "12",
      text: "Двенадцать — первые мечты, которые казались слишком большими. Они оказались правильными.",
    },
    {
      num: "7",
      text: "Семь лет — когда счастье помещалось в один день и не требовало объяснений.",
    },
    {
      num: "1",
      text: "Один день в мире — и уже всё изменилось. Спасибо, что ты есть.",
    },
    {
      num: "26·V",
      text: "26 мая — дата, которую хочется отмечать каждый год, с тортом или без.",
    },
    {
      num: "2020",
      text: "Год, который научил ценить простое: звонок, прогулку, «как дела?».",
    },
    {
      num: "∞",
      text: "Любви, дружбы и смеха — без лимита и без мелкого шрифта.",
    },
    {
      num: "100%",
      text: "Ты на все сто — даже в те дни, когда сам в это не веришь.",
    },
    {
      num: "20",
      text: "С днём рождения. Пусть новый год жизни будет добрее всех предыдущих.",
    },
  ];

  const stage = document.getElementById("stage");
  const hit = document.getElementById("hit");
  const numberEl = document.getElementById("number");
  const captionEl = document.getElementById("caption");
  const hintEl = document.getElementById("hint");
  const progressEl = document.getElementById("progress");

  let index = 0;
  let animating = false;
  let wheelLocked = false;

  function updateProgress() {
    progressEl.textContent = `${index + 1} / ${slides.length}`;
  }

  function setContent(i) {
    const slide = slides[i];
    numberEl.textContent = slide.num;
    captionEl.textContent = slide.text;
    updateProgress();
  }

  function hideHint() {
    hintEl.classList.add("is-hidden");
    progressEl.classList.add("is-visible");
  }

  function animateTo(nextIndex) {
    if (animating || nextIndex === index) return;
    if (nextIndex < 0 || nextIndex >= slides.length) return;

    animating = true;
    hideHint();

    stage.classList.remove("is-active", "is-entering");
    stage.classList.add("is-leaving");

    setTimeout(() => {
      index = nextIndex;
      setContent(index);

      stage.classList.remove("is-leaving");
      stage.classList.add("is-entering");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          stage.classList.remove("is-entering");
          stage.classList.add("is-active");
          animating = false;
        });
      });
    }, 380);
  }

  function next() {
    animateTo((index + 1) % slides.length);
  }

  function prev() {
    animateTo((index - 1 + slides.length) % slides.length);
  }

  function onWheel(e) {
    e.preventDefault();
    if (wheelLocked) return;

    wheelLocked = true;
    setTimeout(() => {
      wheelLocked = false;
    }, 900);

    if (e.deltaY > 0) next();
    else if (e.deltaY < 0) prev();
  }

  hit.addEventListener("click", next);

  window.addEventListener(
    "wheel",
    onWheel,
    { passive: false }
  );

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === " " || e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  });

  let touchY = 0;
  window.addEventListener(
    "touchstart",
    (e) => {
      touchY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchend",
    (e) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      if (dy > 0) next();
      else prev();
    },
    { passive: true }
  );

  stage.classList.add("is-active");
  setContent(0);
  updateProgress();
})();
