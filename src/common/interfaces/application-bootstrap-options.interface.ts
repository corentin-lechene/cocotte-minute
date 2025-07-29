export type AppDriverType = 'orm' | 'in-memory';

export interface ApplicationBootstrapOptions {
    driver: AppDriverType;
}
