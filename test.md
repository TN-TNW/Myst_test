---
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
---

```{code-cell} ipython3
import numpy as np
import plotly.express as px

x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

fig = px.line(x = x, y = y)
fig.show()
```