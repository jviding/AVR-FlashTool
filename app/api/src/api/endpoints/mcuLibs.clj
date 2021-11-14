(ns api.endpoints.mcuLibs
  (:require
   [clojure.java.io :as io]
   [ring.util.response :refer [file-response, response, bad-request]]))


(defn getMCULibs []
    (response {:mcuLibs [
      {:mcu "some1", :lib "lib1.inc"},
      {:mcu "some2", :lib "lib2.inc"},
      {:mcu "some3", :lib "lib3.inc"}]}))

