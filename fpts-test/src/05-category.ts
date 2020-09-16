// https://dev.to/gcanti/getting-started-with-fp-ts-category-4c9a

/**
 * A category is a pair (Objects, Morphisms) where:
 * * Objects is a collection of objects
 * * Morphisms is a collection of morphisms (or arrows) between the objects
 *
 * There's an operation ∘, named "composition", such that the following properties must hold:
 * * (composition of morphisms) whenever f: A ⟼ B and g: B ⟼ C are two morphism in Morphisms then it must exist a third morphism g ∘ f: A ⟼ C in Morphisms which is the composition of f and g
 * * (associativity) if f: A ⟼ B, g: B ⟼ C and h: C ⟼ D then h ∘ (g ∘ f) = (h ∘ g) ∘ f
 * * (identity) for every object X, there exists a morphism identity: X ⟼ X called the identity morphism for X, such that for every morphism f: A ⟼ X and every morphism g: X ⟼ B, we have identity ∘ f = f and g ∘ identity = g
 * 
 * (in our case the ∘ operation is the standard function composition - see function h)
 */

 // example category, with 3 types and 3 functions (morphisms):
function f(s: string): number {
    return s.length
  }
  
  function g(n: number): boolean {
    return n > 2
  }
  
  // h = g ∘ f
  function h(s: string): boolean {
    return g(f(s))
  }

  console.log(`h('sasha') = ${h('sasha')}`)
  console.log(`h('i') = ${h('i')}`)