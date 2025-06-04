import type React from "react"

const GuiaDeTalles: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Guía de Talles</h1>
      <p>Encontrá el talle perfecto para vos. Consultá nuestras tablas de medidas para hacer la mejor elección.</p>

      <div className="mt-4">
        <h3>Ropa - Talles Femeninos</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Talle</th>
                <th>Busto (cm)</th>
                <th>Cintura (cm)</th>
                <th>Cadera (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XS</td>
                <td>80-84</td>
                <td>60-64</td>
                <td>86-90</td>
              </tr>
              <tr>
                <td>S</td>
                <td>84-88</td>
                <td>64-68</td>
                <td>90-94</td>
              </tr>
              <tr>
                <td>M</td>
                <td>88-92</td>
                <td>68-72</td>
                <td>94-98</td>
              </tr>
              <tr>
                <td>L</td>
                <td>92-96</td>
                <td>72-76</td>
                <td>98-102</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>96-100</td>
                <td>76-80</td>
                <td>102-106</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        <h3>Calzado</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Talle ARG</th>
                <th>Talle US</th>
                <th>Talle EUR</th>
                <th>Largo (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>35</td>
                <td>5</td>
                <td>35</td>
                <td>22.5</td>
              </tr>
              <tr>
                <td>36</td>
                <td>6</td>
                <td>36</td>
                <td>23</td>
              </tr>
              <tr>
                <td>37</td>
                <td>7</td>
                <td>37</td>
                <td>23.5</td>
              </tr>
              <tr>
                <td>38</td>
                <td>8</td>
                <td>38</td>
                <td>24</td>
              </tr>
              <tr>
                <td>39</td>
                <td>9</td>
                <td>39</td>
                <td>24.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="alert alert-warning mt-4">
        <strong>Importante:</strong> Las medidas pueden variar según el modelo. En caso de duda, consultanos antes de
        realizar tu compra.
      </div>
    </div>
  )
}

export default GuiaDeTalles
