import { PlaneGeometry, Mesh, OrthographicCamera, Scene, WebGLRenderTarget } from 'three'
import BlurShader from './shaders/blur.js'
import CompositeShader from './shaders/composite.js'

export default class {
  
  constructor() {
    this.quad = new Mesh(new PlaneGeometry(1, 1))
    this.camera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, -1)
    
    this.scene = new Scene()
	this.scene.add(this.quad)

    this.mipmap = []
    
    this.mipmap.push({ x: null, y: null })
    
    for (let i = 256; i > 8; i /= 2) {
      this.mipmap.push({
        x: new WebGLRenderTarget(i, i),
        y: new WebGLRenderTarget(i, i)
      })
    }
    
    this.blurShader = new BlurShader()
    
	this.compositeShader = new CompositeShader()
	this.compositeShader.uniforms['textures'].value = this.mipmap.slice(1).map(level => level.y.texture)
  }
  
  render(renderer, target) { 
    this.quad.material = this.blurShader
    this.mipmap[0].y = target

    for (let i = 1; i < this.mipmap.length ; i++) {
      this.blurShader.uniforms['resolution'].value.x = 1 / this.mipmap[i].x.width
      this.blurShader.uniforms['resolution'].value.y = 1 / this.mipmap[i].x.height
      
      this.blurShader.uniforms['texture'].value = this.mipmap[i-1].y.texture
      this.blurShader.uniforms['direction'].value.x = 1
      this.blurShader.uniforms['direction'].value.y = 0
      renderer.render(this.scene, this.camera, this.mipmap[i].x, true)
      
      this.blurShader.uniforms['texture'].value = this.mipmap[i].x.texture
      this.blurShader.uniforms['direction'].value.x = 0
      this.blurShader.uniforms['direction'].value.y = 1
      renderer.render(this.scene, this.camera, this.mipmap[i].y, true)
    }
      
    this.quad.material = this.compositeShader
    renderer.render(this.scene, this.camera, target, true)
  }
  
}
