---
title: "Un modelo no termina en el notebook"
description: "Qué cambia cuando una predicción deja de ser un experimento y entra a una operación real."
publishedAt: 2026-08-12
category: "Machine learning"
number: "05"
readingTime: "8 min"
image: "whisperer"
featured: true
---

El notebook demuestra que una idea puede funcionar. Producción exige algo distinto: que funcione nuevamente mañana, con datos imperfectos y bajo condiciones que el experimento no contempló.

## La predicción es sólo una parte

Un sistema predictivo incluye adquisición de datos, validación, transformación, inferencia, entrega de resultados y monitoreo. Si cualquiera de esas etapas falla silenciosamente, la precisión medida durante el entrenamiento importa poco.

Por eso conviene definir desde el inicio:

1. Qué decisión apoyará la predicción.
2. Cuánto tiempo puede tardar en llegar.
3. Qué sucede si no está disponible.
4. Cómo se detectará una degradación.

## Observar datos, no solamente servidores

CPU, memoria y latencia cuentan sólo una parte de la historia. También necesitamos observar distribuciones, valores ausentes, frescura y diferencias entre lo que el modelo recibió al entrenar y lo que está recibiendo ahora.

```text
fuente → validación → features → modelo → decisión
             ↓           ↓          ↓
           alertas     métricas    feedback
```

## Una salida segura

Todo modelo debería tener una ruta de degradación. Puede ser una regla simple, el último valor confiable o una decisión manual. La opción correcta depende del costo del error, pero depender ciegamente del modelo rara vez lo es.

El trabajo de ingeniería no consiste únicamente en servir predicciones. Consiste en construir un sistema donde las personas sepan cuándo confiar en ellas.
