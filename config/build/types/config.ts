export type BuildMode = 'production' | 'development'

export type ProjectType = 'storybook' | 'frontend' | 'jest';

export interface BuildPaths {
  build: string;
  entry: string;
  html: string;
  src: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  apiUrl: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  project: ProjectType;
  apiUrl: string;
}

